import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Criar contexto do assistente especializado em DevOps e IA
    const systemMessage = `Você é um assistente especializado em DevOps e Inteligência Artificial, apresentado por Sandro Souza da CloudServo Remote System.

Você está integrado a uma apresentação sobre "Aplicando Modelos de Inteligência Artificial no Aprendizado de DevOps".

Sua função é:
1. Responder perguntas sobre DevOps, IA, automação, CI/CD, Docker, Kubernetes, Terraform, etc.
2. Explicar conceitos de forma clara e prática
3. Dar exemplos de código quando apropriado
4. Interpretar comandos de navegação de slides

COMANDOS DE NAVEGAÇÃO (responda apenas com o comando JSON):
- "próximo slide", "avançar", "next" → {"action": "next"}
- "slide anterior", "voltar", "back" → {"action": "prev"}
- "ir para slide X", "slide X" → {"action": "goto", "slide": X}
- "ir para o início", "primeiro slide" → {"action": "goto", "slide": 1}
- "ir para o final", "último slide" → {"action": "goto", "slide": 11}

Se detectar um comando de navegação, responda APENAS com o JSON do comando.

Para perguntas normais, responda de forma educativa e técnica, com exemplos práticos quando possível.

Seja conciso, direto e útil. Use emojis quando apropriado para tornar as respostas mais amigáveis.`;

    // Criar stream de resposta usando AI SDK v5
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        { role: 'system', content: systemMessage },
        ...messages,
      ],
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Erro na API:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar solicitação' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
