import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const CyberButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: CyberButtonProps) => {
  const baseClasses = 'relative font-mono uppercase tracking-wider transition-all duration-300 overflow-hidden group';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: 'bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-neon',
    secondary: 'bg-accent/10 text-accent border border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-neon-green',
    outline: 'bg-transparent text-foreground border border-border hover:border-primary hover:text-primary',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
      
      {/* Scan line effect on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-current to-transparent opacity-10 translate-y-[-100%] group-hover:animate-scan" />
      </span>
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
