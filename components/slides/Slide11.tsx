import { Linkedin, Network, Heart } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide11Props {
  direction?: number;
}

export default function Slide11({ direction }: Slide11Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center items-center px-20 space-y-12 text-center">
        {/* Logo CloudServo */}
        <div className="flex items-center gap-3 mb-4">
          <Network className="text-blue-500" size={56} />
          <span className="text-3xl font-bold text-white">CloudServo Remote System</span>
        </div>

        {/* Título */}
        <div>
          <h2 className="text-7xl font-bold text-white mb-6">
            <span className="text-blue-400">Obrigado!</span>
          </h2>
          <div className="h-1 w-32 bg-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 max-w-4xl leading-relaxed">
          Conectando <span className="text-blue-400 font-semibold">automação</span>, <span className="text-purple-400 font-semibold">aprendizado</span> e <span className="text-green-400 font-semibold">inteligência artificial</span>
        </h3>

        {/* Card de contato */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30 p-10 max-w-3xl mt-8">
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">SS</span>
            </div>
            
            <div>
              <p className="text-3xl text-white font-bold mb-2">Sandro Souza</p>
              <p className="text-xl text-gray-400">Especialista em DevOps e Segurança em Rede de Computadores</p>
            </div>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/sandro-servo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all group"
            >
              <Linkedin className="text-white group-hover:scale-110 transition-transform" size={28} />
              <span className="text-white text-xl font-semibold">linkedin.com/in/sandro-servo</span>
            </a>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="flex items-center gap-4 mt-8 text-gray-400">
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
          <Heart className="text-red-500" size={24} fill="currentColor" />
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </SlideLayout>
  );
}
