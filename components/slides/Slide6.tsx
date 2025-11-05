import { CheckCircle, Lightbulb, FileText, Code } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide6Props {
  direction?: number;
}

export default function Slide6({ direction }: Slide6Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Exemplo <span className="text-green-400">prático</span>
          </h2>
          <div className="h-1 w-24 bg-green-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold">
          DevOps Coach com IA
        </h3>

        {/* Tópicos */}
        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 bg-green-500/5 rounded-xl border border-green-500/20 hover:bg-green-500/10 transition-all">
            <CheckCircle className="text-green-400 flex-shrink-0" size={32} />
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-green-400 font-semibold">Corrige Dockerfiles</span> e pipelines automaticamente
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-green-500/5 rounded-xl border border-green-500/20 hover:bg-green-500/10 transition-all">
            <Lightbulb className="text-green-400 flex-shrink-0" size={32} />
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-green-400 font-semibold">Sugere otimizações</span> em tempo real
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-green-500/5 rounded-xl border border-green-500/20 hover:bg-green-500/10 transition-all">
            <FileText className="text-green-400 flex-shrink-0" size={32} />
            <p className="text-2xl text-white leading-relaxed">
              <span className="text-green-400 font-semibold">Gera relatórios</span> de containers
            </p>
          </div>

          <div className="flex items-start gap-6 p-6 bg-green-500/5 rounded-xl border border-green-500/20 hover:bg-green-500/10 transition-all">
            <Code className="text-green-400 flex-shrink-0" size={32} />
            <p className="text-2xl text-white leading-relaxed">
              Dá <span className="text-green-400 font-semibold">feedback</span> sobre o código e infraestrutura
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
