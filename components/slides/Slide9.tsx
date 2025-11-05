import { Terminal, Play } from 'lucide-react';
import SlideLayout from './SlideLayout';

interface Slide9Props {
  direction?: number;
}

export default function Slide9({ direction }: Slide9Props) {
  return (
    <SlideLayout direction={direction}>
      <div className="flex flex-col h-full justify-center px-20 space-y-12">
        {/* Título */}
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Demonstração <span className="text-green-400">rápida</span>
          </h2>
          <div className="h-1 w-24 bg-green-500 rounded-full"></div>
        </div>

        {/* Subtítulo */}
        <h3 className="text-3xl text-gray-300 font-semibold flex items-center gap-4">
          <Terminal className="text-green-400" size={40} />
          Exemplo prático com ChatGPT
        </h3>

        {/* Prompt Box */}
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/30 p-10">
          <div className="flex items-start gap-4 mb-6">
            <Play className="text-green-400 flex-shrink-0" size={32} />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Prompt</p>
              <p className="text-2xl text-white font-mono leading-relaxed">
                "Crie um pipeline CI/CD no GitHub Actions para um app Laravel com Docker"
              </p>
            </div>
          </div>
        </div>

        {/* Explicação */}
        <div className="bg-blue-500/5 rounded-xl border border-blue-500/20 p-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            💡 <span className="text-blue-400 font-semibold">Mostre o resultado gerado pela IA ao vivo</span>
          </p>
          <p className="text-lg text-gray-400 mt-4">
            A IA pode gerar um pipeline completo com build, testes, Docker e deploy em segundos
          </p>
        </div>

        {/* Código simulado */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400">.github/workflows/deploy.yml</span>
          </div>
          <pre className="text-green-400">
{`name: Laravel CI/CD
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t app .`}
          </pre>
        </div>
      </div>
    </SlideLayout>
  );
}
