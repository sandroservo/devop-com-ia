import { GitBranch, Workflow, RefreshCw } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide2Props {
  direction?: number;
}

export default function Slide2({ direction }: Slide2Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            O que é <span className="text-blue-400">DevOps</span>
          </h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold">
          DevOps: cultura, não apenas ferramentas
        </h3>

        {/* Tópicos */}
        <div className="space-y-8">
          <div className="flex items-start gap-6 group">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/20 transition-all">
              <GitBranch className="text-blue-400" size={32} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                Integra <span className="text-blue-400 font-semibold">desenvolvimento</span> e <span className="text-blue-400 font-semibold">operações</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 group">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/20 transition-all">
              <Workflow className="text-blue-400" size={32} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                Foco em <span className="text-blue-400 font-semibold">automação</span>, <span className="text-blue-400 font-semibold">integração contínua</span> e <span className="text-blue-400 font-semibold">entrega rápida</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 group">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/20 transition-all">
              <RefreshCw className="text-blue-400" size={32} />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-white leading-relaxed">
                <span className="text-blue-400 font-semibold">Aprendizado constante</span>: novas ferramentas e práticas surgem todo mês
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
