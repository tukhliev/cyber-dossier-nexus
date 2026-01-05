import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'glow';
  delay?: number;
}

export const CyberCard = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'default',
  delay = 0
}: CyberCardProps) => {
  const variantClasses = {
    default: 'bg-card border-border hover:border-primary/50',
    elevated: 'bg-card-elevated border-border hover:border-primary/50 shadow-card',
    glow: 'bg-card border-primary/30 hover:border-primary hover:shadow-neon',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        relative border transition-all duration-300 overflow-hidden
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-px bg-primary/30" />
        <div className="absolute top-0 left-0 w-px h-full bg-primary/30" />
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-full h-px bg-primary/30" />
        <div className="absolute top-0 right-0 w-px h-full bg-primary/30" />
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-full h-px bg-primary/30" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-primary/30" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-full h-px bg-primary/30" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-primary/30" />
      </div>

      {children}
    </motion.div>
  );
};

interface StatusIndicatorProps {
  status: 'active' | 'completed' | 'locked';
  className?: string;
}

export const StatusIndicator = ({ status, className = '' }: StatusIndicatorProps) => {
  const statusConfig = {
    active: { color: 'bg-accent', label: 'ACTIVE', textColor: 'text-accent' },
    completed: { color: 'bg-primary', label: 'PWNED', textColor: 'text-primary' },
    locked: { color: 'bg-destructive', label: 'LOCKED', textColor: 'text-destructive' },
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`} />
      </span>
      <span className={`text-xs font-mono uppercase tracking-wider ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  );
};
