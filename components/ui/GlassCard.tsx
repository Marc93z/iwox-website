import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function GlassCard({ children, className = '', hoverable = true }: GlassCardProps) {
  return (
    <div className={`${hoverable ? 'glass-card' : 'glass'} p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
