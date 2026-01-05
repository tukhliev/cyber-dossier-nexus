import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Lock, Mail, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { GlitchText } from '@/components/ui/GlitchText';
import { CyberButton } from '@/components/ui/CyberButton';
import { CyberCard } from '@/components/ui/CyberCard';

const emailSchema = z.string().email('Invalid email format');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(error.message);
          }
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered');
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background hex-pattern flex items-center justify-center p-6">
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none opacity-20 z-0" />
      
      {/* Grid background */}
      <div className="fixed inset-0 cyber-grid opacity-50 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <CyberCard variant="elevated" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-primary flex items-center justify-center">
                  <Terminal size={32} className="text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary" />
              </div>
            </div>
            <GlitchText
              text={isLogin ? 'AUTHENTICATE' : 'REGISTER'}
              as="h1"
              className="text-2xl text-foreground mb-2"
            />
            <p className="font-mono text-sm text-muted-foreground">
              {isLogin ? 'Access your operator profile' : 'Create new operator credentials'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block font-mono text-xs text-muted-foreground mb-2">
                  DISPLAY_NAME
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="hacker_name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-2">
                EMAIL_ADDRESS
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="operator@cyber.net"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 text-destructive font-mono text-sm"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <CyberButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
                  PROCESSING...
                </span>
              ) : (
                isLogin ? 'LOGIN' : 'CREATE ACCOUNT'
              )}
            </CyberButton>
          </form>

          {/* Toggle */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="font-mono text-sm text-muted-foreground">
              {isLogin ? "Don't have credentials?" : 'Already registered?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="font-mono text-sm text-primary hover:text-primary-glow transition-colors mt-1"
            >
              {isLogin ? 'Create new account' : 'Login instead'}
            </button>
          </div>
        </CyberCard>

        {/* Terminal decoration */}
        <div className="mt-6 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>secure_connection --established</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent">$</span>
            <span className="text-primary animate-pulse">awaiting_credentials_</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
