import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CyberScene } from '../components/three/CyberScene';
import { GlitchText, NeonText } from '../components/ui/GlitchText';
import { TerminalText } from '../components/ui/TerminalText';
import { CyberButton } from '../components/ui/CyberButton';
import { Navigation } from '../components/Navigation';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden scanlines">
      {/* 3D Background */}
      <CyberScene />
      
      {/* Navigation */}
      <Navigation />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-4xl"
        >
          {/* Terminal header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Terminal size={16} className="text-accent" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              <TerminalText text="root@ctf-lab:~# accessing mainframe..." delay={1000} speed={40} />
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-6"
          >
            <GlitchText 
              text="CYBER OPERATOR" 
              as="h1"
              className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mb-8"
          >
            <p className="font-mono text-lg md:text-xl text-muted-foreground">
              <span className="text-primary">&lt;</span>
              <NeonText text=" CTF Player " variant="cyan" />
              <span className="text-muted-foreground">/</span>
              <NeonText text=" Security Researcher " variant="green" />
              <span className="text-muted-foreground">/</span>
              <NeonText text=" Pwn Enthusiast " variant="cyan" />
              <span className="text-primary">&gt;</span>
            </p>
          </motion.div>

          {/* Status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="flex items-center justify-center gap-6 mb-12 text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent">SYSTEMS ONLINE</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">MACHINES PWNED:</span>
              <span className="text-primary">150+</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-muted-foreground">RANK:</span>
              <span className="text-warning">ELITE</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/writeups">
              <CyberButton variant="primary" size="lg">
                <span>ACCESS WRITEUPS</span>
                <ChevronRight size={16} />
              </CyberButton>
            </Link>
            <Link to="/about">
              <CyberButton variant="outline" size="lg">
                <span>VIEW DOSSIER</span>
              </CyberButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground tracking-widest">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 right-8 w-px h-48 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      
      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-20 left-6 hidden lg:block"
      >
        <div className="font-mono text-[10px] text-muted-foreground/50 space-y-1">
          <div>SYS.VER: 4.2.0</div>
          <div>UPTIME: 99.9%</div>
          <div>SEC.LVL: MAX</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-20 right-6 hidden lg:block text-right"
      >
        <div className="font-mono text-[10px] text-muted-foreground/50 space-y-1">
          <div>CONN: SECURE</div>
          <div>ENCRYPT: AES-256</div>
          <div>AUTH: VALID</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
