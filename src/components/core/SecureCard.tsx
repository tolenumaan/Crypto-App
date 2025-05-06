import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SecureCardProps {
  children: ReactNode;
  securityLevel?: 'low' | 'medium' | 'high';
  className?: string;
}

export const SecureCard = ({ 
  children, 
  securityLevel = 'medium', 
  className 
}: SecureCardProps) => {
  const borderColors = {
    low: 'border-yellow-500',
    medium: 'border-blue-500',
    high: 'border-green-500'
  };

  return (
    <div className={cn(
      'bg-background rounded-xl border-2 p-6 shadow-security',
      borderColors[securityLevel],
      className
    )}>
      <div className="security-corner top-left" />
      <div className="security-corner top-right" />
      <div className="security-corner bottom-left" />
      <div className="security-corner bottom-right" />
      
      {children}
    </div>
  );
};