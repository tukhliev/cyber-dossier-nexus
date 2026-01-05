import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlitchText } from '../components/ui/GlitchText';
import { CyberButton } from '../components/ui/CyberButton';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center px-6">
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* Terminal header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Terminal size={16} className="text-destructive" />
          <span className="font-mono text-xs text-destructive tracking-widest">
            ERROR: ACCESS_DENIED
          </span>
        </div>

        {/* 404 */}
        <GlitchText 
          text="404" 
          as="h1" 
          className="text-8xl md:text-9xl text-destructive mb-4"
        />

        {/* Message */}
        <p className="font-mono text-xl text-foreground mb-4">
          SYSTEM NOT FOUND
        </p>
        <p className="font-mono text-sm text-muted-foreground mb-8">
          The requested resource does not exist or has been classified.
          <br />
          Check your access permissions and try again.
        </p>

        {/* Terminal output */}
        <div className="border border-border bg-card p-4 mb-8 text-left max-w-md mx-auto">
          <div className="font-mono text-xs text-muted-foreground space-y-1">
            <div><span className="text-accent">$</span> locate target_system</div>
            <div className="text-destructive">ERROR: No such file or directory</div>
            <div><span className="text-accent">$</span> cat /var/log/access.log</div>
            <div className="text-warning">Permission denied. Logging incident.</div>
            <div><span className="text-accent">$</span> _<span className="animate-pulse">▋</span></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <CyberButton variant="primary" size="md">
              <Home size={16} />
              <span>RETURN TO BASE</span>
            </CyberButton>
          </Link>
          <CyberButton variant="outline" size="md" onClick={() => window.history.back()}>
            <ArrowLeft size={16} />
            <span>GO BACK</span>
          </CyberButton>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-destructive/30 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-destructive/30 to-transparent" />
    </div>
  );
};

export default NotFound;
