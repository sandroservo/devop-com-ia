import { Zap, Target, Clock, TrendingUp } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide7Props {
  direction?: number;
}

export default function Slide7({ direction }: Slide7Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Benefícios <span className="text-yellow-400">educacionais</span>
          </h2>
          <div className="h-1 w-24 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold">
          Como a IA potencializa o aprendizado
        </h3>

        {/* Grid de benefícios */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/30 hover:scale-105 transition-transform">
            <Zap className="text-yellow-400" size={48} />
            <div>
              <p className="text-2xl text-white font-semibold mb-2">Feedback instantâneo</p>
              <p className="text-lg text-gray-400">e personalizado</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 hover:scale-105 transition-transform">
            <Target className="text-orange-400" size={48} />
            <div>
              <p className="text-2xl text-white font-semibold mb-2">Aprendizado ativo</p>
              <p className="text-lg text-gray-400">(erro → correção → reforço)</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform">
            <Clock className="text-green-400" size={48} />
            <div>
              <p className="text-2xl text-white font-semibold mb-2">Menos tempo configurando</p>
              <p className="text-lg text-gray-400">mais tempo aprendendo</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform">
            <TrendingUp className="text-blue-400" size={48} />
            <div>
              <p className="text-2xl text-white font-semibold mb-2">Aumenta a confiança</p>
              <p className="text-lg text-gray-400">do aluno iniciante</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
