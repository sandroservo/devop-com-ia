import { Sparkles, TrendingUp } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide10Props {
  direction?: number;
}

export default function Slide10({ direction }: Slide10Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center items-center px-20 space-y-12 text-center">
        {/* Ícone */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
          <Sparkles className="text-blue-400 relative" size={100} strokeWidth={1.5} />
        </div>

        {/* Título */}
        <div>
          <h2 className="text-6xl font-bold text-white mb-6">
            Conclusão
          </h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* Subtítulo principal */}
        <h3 className="text-4xl text-gray-300 font-semibold max-w-4xl">
          <span className="text-blue-400">DevOps</span> + <span className="text-purple-400">IA</span> = <span className="text-green-400">Aprendizado exponencial</span>
        </h3>

        {/* Frase de impacto */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-2xl border border-blue-500/30 p-12 max-w-5xl">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">💡</span>
            <TrendingUp className="text-blue-400" size={40} />
          </div>
          <blockquote className="text-3xl text-white leading-relaxed italic">
            "O DevOps do futuro não configura apenas servidores —<br />
            <span className="text-blue-400 font-semibold">Ele orquestra inteligências humanas e artificiais.</span>"
          </blockquote>
        </div>

        {/* Elementos decorativos */}
        <div className="flex gap-8 mt-8">
          <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
          <div className="w-16 h-1 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </SlideLayout>
  );
}
