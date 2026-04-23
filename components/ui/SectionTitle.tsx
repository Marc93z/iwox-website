import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className="section-title">{children}</h2>
      {subtitle && (
        <p className="text-zinc-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
