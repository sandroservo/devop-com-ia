'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Mic, MicOff, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface AIAssistantProps {
  onSlideChange: (action: string, slide?: number) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ onSlideChange }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAutoListening, setIsAutoListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Carregar estado do localStorage após montagem (evita erro de hydration)
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoListening') === 'true';
      setIsAutoListening(saved);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Erro na resposta');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const text = decoder.decode(value);
          assistantMessage += text;
          
          // Atualizar mensagem em tempo real
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
              lastMessage.content = assistantMessage;
            } else {
              newMessages.push({ role: 'assistant', content: assistantMessage });
            }
            return newMessages;
          });
        }

        // Verificar se é comando de navegação
        try {
          const trimmed = assistantMessage.trim();
          if (trimmed.startsWith('{') && trimmed.includes('action')) {
            const command = JSON.parse(trimmed);
            if (command.action === 'next') {
              onSlideChange('next');
            } else if (command.action === 'prev') {
              onSlideChange('prev');
            } else if (command.action === 'goto' && command.slide) {
              onSlideChange('goto', command.slide);
            }
          }
        } catch (e) {
          // Não é JSON, apenas resposta normal
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro. Tente novamente.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Iniciar automaticamente ao carregar se estava ativo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAutoListening && recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.log('Aguardando inicialização...');
        }
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Manter modo automático ativo mesmo quando fechado/minimizado
  useEffect(() => {
    if (isAutoListening && recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // Já está rodando
      }
    }
  }, [isOpen, isMinimized, isAutoListening]);

  // Configurar reconhecimento de voz
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        setInput(speechResult);
        
        // Submeter automaticamente
        const userMessage: Message = { role: 'user', content: speechResult };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        })
        .then(async (response) => {
          if (!response.ok) throw new Error('Erro na resposta');
          
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let assistantMessage = '';

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const text = decoder.decode(value);
              assistantMessage += text;
              
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content = assistantMessage;
                } else {
                  newMessages.push({ role: 'assistant', content: assistantMessage });
                }
                return newMessages;
              });
            }

            // Verificar comandos de navegação
            const trimmed = assistantMessage.trim();
            if (trimmed.startsWith('{') && trimmed.includes('action')) {
              try {
                const command = JSON.parse(trimmed);
                if (command.action === 'next') onSlideChange('next');
                else if (command.action === 'prev') onSlideChange('prev');
                else if (command.action === 'goto' && command.slide) onSlideChange('goto', command.slide);
              } catch (e) {}
            }
          }
        })
        .catch((error) => {
          console.error('Erro:', error);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'Erro ao processar comando.' 
          }]);
        })
        .finally(() => {
          setIsLoading(false);
          setInput('');
        });
      };

      recognitionRef.current.onerror = (event: any) => {
        // Ignorar erro "no-speech" (silêncio é normal)
        if (event.error === 'no-speech') {
          // Apenas reiniciar silenciosamente
          return;
        }
        
        // Log apenas para erros relevantes
        if (event.error !== 'aborted') {
          console.warn('Reconhecimento de voz:', event.error);
        }
        
        if (isAutoListening && event.error !== 'no-speech') {
          // Reiniciar automaticamente em caso de erro
          setTimeout(() => {
            if (recognitionRef.current && isAutoListening) {
              try {
                recognitionRef.current.start();
              } catch (e) {}
            }
          }, 1000);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Se modo automático está ativo, reiniciar escuta
        if (isAutoListening) {
          setTimeout(() => {
            if (recognitionRef.current) {
              try {
                recognitionRef.current.start();
                setIsListening(true);
              } catch (e) {}
            }
          }, 500);
        }
      };
    }
  }, [isAutoListening, messages, onSlideChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Reconhecimento de voz não disponível neste navegador. Use Chrome ou Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const toggleAutoListening = () => {
    if (!recognitionRef.current) {
      alert('Reconhecimento de voz não disponível neste navegador. Use Chrome ou Edge.');
      return;
    }

    if (isAutoListening) {
      // Desativar modo automático
      setIsAutoListening(false);
      localStorage.setItem('autoListening', 'false');
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Ativar modo automático
      setIsAutoListening(true);
      localStorage.setItem('autoListening', 'true');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Erro ao iniciar reconhecimento:', e);
      }
    }
  };

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    // Usar estado estável para evitar hydration mismatch
    const isActive = isMounted && isAutoListening;
    
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform group ${
            isActive 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          title={isActive ? "Assistente IA - Modo Automático Ativo 🎤" : "Abrir Assistente IA"}
        >
          <Bot className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
            isActive ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'
          }`}></span>
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isActive 
              ? '🎤 Escuta Automática Ativa - Diga "próximo slide"' 
              : 'Assistente IA - Pergunte sobre DevOps! 🤖'}
          </div>
        </button>
        
        {/* Badge permanente quando modo automático está ativo */}
        {isActive && (
          <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 px-2 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-1 sm:gap-2 animate-pulse">
            <Mic size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Escuta Ativa</span>
            <span className="text-xs sm:text-sm font-semibold sm:hidden">🎤</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-gray-900 border border-blue-500/30 rounded-2xl shadow-2xl transition-all ${
        isMinimized
          ? 'bottom-8 right-8 w-80 h-16'
          : 'bottom-8 right-8 w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="text-blue-400" size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Assistente DevOps IA</h3>
            {isLoading && (
              <p className="text-xs text-gray-400">Pensando...</p>
            )}
            {isMounted && isAutoListening && !isLoading && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Escuta automática ativa
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoListening}
            className={`p-2 rounded-lg transition-all ${
              isMounted && isAutoListening 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'hover:bg-gray-800 text-gray-400'
            }`}
            title={isMounted && isAutoListening ? 'Desativar escuta automática' : 'Ativar escuta automática (Modo Apresentação)'}
          >
            {isMounted && isAutoListening ? (
              <MicOff size={18} />
            ) : (
              <Mic size={18} />
            )}
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="text-gray-400" size={18} />
            ) : (
              <Minimize2 className="text-gray-400" size={18} />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="text-gray-400" size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[440px]">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8">
                <Bot className="mx-auto mb-4 text-blue-400" size={48} />
                <p className="text-sm mb-2">👋 Olá! Sou seu assistente de DevOps e IA</p>
                <p className="text-xs mb-4">Faça perguntas ou use comandos:</p>
                <div className="text-xs space-y-1 text-left max-w-xs mx-auto">
                  <p>• "Próximo slide" ou "Avançar"</p>
                  <p>• "Slide anterior" ou "Voltar"</p>
                  <p>• "Ir para slide 5"</p>
                  <p>• "O que é Docker?"</p>
                  <p>• "Explique CI/CD"</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Bot className="inline mr-2 mb-1" size={16} />
                  )}
                  <span className="text-sm whitespace-pre-wrap">{message.content}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {isListening ? (
                  <MicOff className="text-white" size={20} />
                ) : (
                  <Mic className="text-gray-400" size={20} />
                )}
              </button>
              <input
                type="text"
                value={input || ''}
                onChange={handleInputChange}
                placeholder={isListening ? 'Ouvindo...' : 'Pergunte algo ou dê um comando...'}
                className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isListening}
              />
              <button
                type="submit"
                disabled={!input?.trim() || isLoading}
                className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="text-white" size={20} />
              </button>
            </form>
            {transcript && (
              <p className="text-xs text-gray-400 mt-2">
                Ouvi: "{transcript}"
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
