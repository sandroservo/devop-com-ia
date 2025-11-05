import { Sparkles, Bot, Zap } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide4Props {
  direction?: number;
}

export default function Slide4({ direction }: Slide4Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            A entrada da <span className="text-purple-400">Inteligência Artificial</span>
          </h2>
          <div className="h-1 w-24 bg-purple-500 rounded-full"></div>
        </div>

        {/* Subtítulo com ícone */}
        <div className="flex items-center gap-4">
          <Bot className="text-purple-400" size={48} />
          <h3 className="text-3xl text-gray-300 font-semibold">
            IA: o novo copiloto do aprendizado DevOps
          </h3>
        </div>

        {/* Tópicos */}
        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 bg-purple-500/5 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all group">
            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="text-purple-400" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                <span className="text-purple-400 font-semibold">Entende o contexto</span> do código
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-6 bg-purple-500/5 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all group">
            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="text-purple-400" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                <span className="text-purple-400 font-semibold">Corrige erros</span> e explica soluções
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-6 bg-purple-500/5 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all group">
            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="text-purple-400" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                <span className="text-purple-400 font-semibold">Gera arquivos</span> YAML, scripts e pipelines
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-6 bg-purple-500/5 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all group">
            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Bot className="text-purple-400" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                Atua como <span className="text-purple-400 font-semibold">tutor 24h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
