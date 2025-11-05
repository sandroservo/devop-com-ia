import { MessageSquare, Brain, Hammer, BookOpen } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide5Props {
  direction?: number;
}

export default function Slide5({ direction }: Slide5Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Aplicações práticas da <span className="text-blue-400">IA em DevOps</span>
          </h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold">
          Como aplicar IA no aprendizado
        </h3>

        {/* Grid de aplicações */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex items-start gap-6 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all">
            <div className="text-4xl">💬</div>
            <div className="flex-1">
              <p className="text-2xl text-white font-semibold mb-2">Assistentes inteligentes</p>
              <p className="text-lg text-gray-400">(ChatGPT, Copilot)</p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="text-4xl">🧠</div>
            <div className="flex-1">
              <p className="text-2xl text-white font-semibold mb-2">Simulações de falhas</p>
              <p className="text-lg text-gray-400">e troubleshooting</p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all">
            <div className="text-4xl">🏗️</div>
            <div className="flex-1">
              <p className="text-2xl text-white font-semibold mb-2">Geração de IaC</p>
              <p className="text-lg text-gray-400">(Terraform, Ansible)</p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 hover:border-orange-500/50 transition-all">
            <div className="text-4xl">📚</div>
            <div className="flex-1">
              <p className="text-2xl text-white font-semibold mb-2">Explicações interativas</p>
              <p className="text-lg text-gray-400">com exemplos reais</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
