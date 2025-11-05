import { Rocket, Users, BarChart, Sparkles } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide8Props {
  direction?: number;
}

export default function Slide8({ direction }: Slide8Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            O futuro do <span className="text-cyan-400">aprendizado DevOps</span>
          </h2>
          <div className="h-1 w-24 bg-cyan-500 rounded-full"></div>
        </div>

        {/* Subtítulo com ícone */}
        <div className="flex items-center gap-4">
          <Rocket className="text-cyan-400" size={48} />
          <h3 className="text-3xl text-gray-300 font-semibold">
            O futuro é o "DevOps Inteligente"
          </h3>
        </div>

        {/* Tópicos */}
        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 bg-cyan-500/5 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all group">
            <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Users className="text-cyan-400" size={32} />
            </div>
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-cyan-400 font-semibold">Mentores virtuais</span> adaptativos
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-cyan-500/5 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all group">
            <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="text-cyan-400" size={32} />
            </div>
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-cyan-400 font-semibold">Bootcamps autônomos</span> com IA
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-cyan-500/5 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all group">
            <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <BarChart className="text-cyan-400" size={32} />
            </div>
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-cyan-400 font-semibold">Avaliações práticas</span> por logs e pipelines
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-cyan-500/5 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all group">
            <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Rocket className="text-cyan-400" size={32} />
            </div>
            <p className="text-2xl text-white leading-relaxed">
              IA como <span className="text-cyan-400 font-semibold">parceira de aprendizado contínuo</span>
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
