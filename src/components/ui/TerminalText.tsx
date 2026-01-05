import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TerminalText = ({ 
  text, 
  delay = 0, 
  speed = 30, 
  className = '', 
  showCursor = true,
  onComplete 
}: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return interval;
    };

    timeout = setTimeout(() => {
      const interval = startTyping();
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-primary"
        >
          ▋
        </motion.span>
      )}
      {showCursor && isComplete && (
        <span className="text-primary cursor-blink" />
      )}
    </span>
  );
};

interface TerminalLineProps {
  prefix?: string;
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export const TerminalLine = ({ 
  prefix = '>', 
  text, 
  delay = 0, 
  speed = 30,
  className = ''
}: TerminalLineProps) => {
  return (
    <div className={`font-mono ${className}`}>
      <span className="text-accent mr-2">{prefix}</span>
      <TerminalText text={text} delay={delay} speed={speed} />
    </div>
  );
};
