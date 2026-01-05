import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, User, FileCode, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { path: '/', label: 'HOME', icon: Terminal },
  { path: '/writeups', label: 'WRITEUPS', icon: FileCode },
  { path: '/about', label: 'ABOUT', icon: User },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 border border-primary/50 rotate-45 group-hover:border-primary transition-colors group-hover:shadow-neon" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary font-display text-lg font-bold">H</span>
              </div>
            </div>
            <span className="hidden md:block text-foreground font-mono text-sm tracking-wider">
              <span className="text-muted-foreground">[</span>
              HACKER
              <span className="text-muted-foreground">]</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-4 py-2 font-mono text-sm tracking-wider transition-all duration-300
                    ${isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={14} />
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 border border-primary/30 bg-primary/5"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Auth button */}
            {user ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 font-mono text-sm tracking-wider text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2"
              >
                <LogOut size={14} />
                LOGOUT
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 font-mono text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <LogIn size={14} />
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-card border-l border-border p-6 pt-20">
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 font-mono text-sm tracking-wider
                          border transition-all duration-300
                          ${isActive 
                            ? 'text-primary border-primary/50 bg-primary/10' 
                            : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                          }
                        `}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Auth button mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  {user ? (
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 font-mono text-sm tracking-wider text-muted-foreground border border-transparent hover:text-destructive hover:border-destructive/30 transition-all duration-300 w-full"
                    >
                      <LogOut size={16} />
                      LOGOUT
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 font-mono text-sm tracking-wider text-muted-foreground border border-transparent hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                      <LogIn size={16} />
                      LOGIN
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
