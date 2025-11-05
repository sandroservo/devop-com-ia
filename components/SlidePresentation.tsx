'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '@/data/slides';
import AIAssistant from './AIAssistant';
import CertificateModule from './CertificateModule';

export default function SlidePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const gotoSlide = (slideNumber: number) => {
    const targetSlide = slideNumber - 1; // Converter para índice 0-based
    if (targetSlide >= 0 && targetSlide < slides.length) {
      setDirection(targetSlide > currentSlide ? 1 : -1);
      setCurrentSlide(targetSlide);
    }
  };

  const handleSlideCommand = (action: string, slide?: number) => {
    switch (action) {
      case 'next':
        nextSlide();
        break;
      case 'prev':
        prevSlide();
        break;
      case 'goto':
        if (slide) gotoSlide(slide);
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const Slide = slides[currentSlide];

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 150, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Slide Content */}
      <div className="relative h-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-full flex flex-col">
          <Slide direction={direction} />
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-blue-600' 
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 text-white/60 text-sm font-mono">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* AI Assistant */}
      <AIAssistant onSlideChange={handleSlideCommand} />

      {/* Certificate Module */}
      <CertificateModule 
        presentationTitle="Aplicando Modelos de Inteligência Artificial no Aprendizado de DevOps"
        instructorName="Sandro Souza - CloudServo Remote System"
      />
    </div>
  );
}
