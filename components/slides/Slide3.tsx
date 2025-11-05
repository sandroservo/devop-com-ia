import { AlertTriangle, TrendingUp, Clock, Server } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide3Props {
  direction?: number;
}

export default function Slide3({ direction }: Slide3Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            O desafio do <span className="text-red-400">aprendizado</span>
          </h2>
          <div className="h-1 w-24 bg-red-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold">
          Por que aprender DevOps é tão complexo?
        </h3>

        {/* Tópicos */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 p-6 bg-red-500/5 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <AlertTriangle className="text-red-400" size={40} />
            <p className="text-xl text-white leading-relaxed">
              <span className="text-red-400 font-semibold">Excesso de ferramentas</span><br />
              <span className="text-gray-400 text-lg">(Docker, K8s, Terraform, etc.)</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-red-500/5 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <TrendingUp className="text-red-400" size={40} />
            <p className="text-xl text-white leading-relaxed">
              <span className="text-red-400 font-semibold">Curva de aprendizado íngreme</span><br />
              <span className="text-gray-400 text-lg">Conceitos complexos e interconectados</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-red-500/5 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <Clock className="text-red-400" size={40} />
            <p className="text-xl text-white leading-relaxed">
              <span className="text-red-400 font-semibold">Falta de feedback imediato</span><br />
              <span className="text-gray-400 text-lg">Difícil saber se está no caminho certo</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-red-500/5 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <Server className="text-red-400" size={40} />
            <p className="text-xl text-white leading-relaxed">
              <span className="text-red-400 font-semibold">Dificuldade em simular ambientes reais</span><br />
              <span className="text-gray-400 text-lg">Infraestrutura complexa e cara</span>
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
