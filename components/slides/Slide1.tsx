import { Brain, Network } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide1Props {
  direction?: number;
}

export default function Slide1({ direction }: Slide1Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        {/* Logo CloudServo */}
        <div className="flex items-center gap-3 mb-4">
          <Network className="text-blue-500" size={48} />
          <span className="text-2xl font-bold text-white">CloudServo Remote System</span>
        </div>

        {/* Ícone Principal */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
          <Brain className="text-blue-400 relative" size={120} strokeWidth={1.5} />
        </div>

        {/* Título Principal */}
        <h1 className="text-6xl font-bold text-white leading-tight max-w-5xl">
          Aplicando Modelos de <span className="text-blue-400">Inteligência Artificial</span> no Aprendizado de <span className="text-blue-400">DevOps</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-2xl text-gray-300 max-w-3xl">
          Como a IA está transformando a forma de aprender automação e infraestrutura
        </p>

        {/* Rodapé */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2">
          <div className="h-1 w-32 bg-blue-500 rounded-full"></div>
          <p className="text-lg text-gray-400">
            <span className="text-white font-semibold">Sandro Souza</span> — Especialista em DevOps e Segurança em Rede de Computadores
          </p>
          <p className="text-sm text-gray-500">CloudServo Remote System</p>
        </div>
      </div>
    </SlideLayout>
  );
}
