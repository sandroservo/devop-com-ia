import { ReactNode } from 'react';

interface SlideLayoutProps {
  children: ReactNode;
  direction?: number;
}

export default function SlideLayout({ children, direction = 0 }: SlideLayoutProps) {
  return (
    <div 
      className={`
        w-full h-full flex flex-col justify-center
        animate-in fade-in duration-500
        ${direction > 0 ? 'slide-in-from-right' : direction < 0 ? 'slide-in-from-left' : ''}
      `}
    >
      {children}
    </div>
  );
}
