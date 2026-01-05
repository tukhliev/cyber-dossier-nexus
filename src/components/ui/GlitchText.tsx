import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export const GlitchText = ({ text, className = '', as: Component = 'span' }: GlitchTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative inline-block"
    >
      <Component 
        className={`glitch font-display ${className}`}
        data-text={text}
      >
        {text}
      </Component>
    </motion.div>
  );
};

interface NeonTextProps {
  text: string;
  className?: string;
  variant?: 'cyan' | 'green' | 'purple';
}

export const NeonText = ({ text, className = '', variant = 'cyan' }: NeonTextProps) => {
  const variantClasses = {
    cyan: 'text-primary neon-text',
    green: 'text-accent neon-text-green',
    purple: 'text-purple',
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${variantClasses[variant]} ${className}`}
    >
      {text}
    </motion.span>
  );
};
