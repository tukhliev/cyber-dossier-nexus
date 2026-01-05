import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, Shield, Lock, Unlock, Terminal } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { CyberCard, StatusIndicator } from '../components/ui/CyberCard';
import { GlitchText } from '../components/ui/GlitchText';
import { useWriteups, Writeup } from '@/hooks/useWriteups';

const platforms = ['All', 'HTB', 'THM', 'Custom'];
const difficulties = ['All', 'easy', 'medium', 'hard', 'insane'];

const difficultyColors: Record<string, string> = {
  easy: 'text-accent',
  medium: 'text-warning',
  hard: 'text-destructive',
  insane: 'text-purple',
};

const platformColors: Record<string, string> = {
  HTB: 'text-accent border-accent/30',
  THM: 'text-primary border-primary/30',
  Custom: 'text-purple border-purple/30',
};

export const Writeups = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: writeups = [], isLoading } = useWriteups();

  const filteredWriteups = writeups.filter((writeup: Writeup) => {
    const matchesPlatform = selectedPlatform === 'All' || writeup.platform === selectedPlatform;
    const matchesDifficulty = selectedDifficulty === 'All' || writeup.difficulty === selectedDifficulty;
    const matchesSearch = writeup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writeup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Navigation />
      
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none opacity-20 z-0" />

      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={20} className="text-primary" />
              <span className="font-mono text-xs text-muted-foreground tracking-widest">
                /home/hacker/writeups
              </span>
            </div>
            <GlitchText 
              text="CTF WRITEUPS" 
              as="h1" 
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
            />
            <p className="font-mono text-muted-foreground max-w-2xl">
              Documented exploits and methodologies from various CTF platforms. 
              Each writeup contains detailed analysis and exploitation techniques.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <CyberCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search writeups or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Platform Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <Filter size={14} className="text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground mr-2">PLATFORM:</span>
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`
                        px-3 py-1 font-mono text-xs border transition-all duration-200
                        ${selectedPlatform === platform 
                          ? 'border-primary text-primary bg-primary/10' 
                          : 'border-border text-muted-foreground hover:border-muted-foreground'
                        }
                      `}
                    >
                      {platform}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <Shield size={14} className="text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground mr-2">DIFFICULTY:</span>
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`
                        px-3 py-1 font-mono text-xs border transition-all duration-200
                        ${selectedDifficulty === difficulty 
                          ? 'border-primary text-primary bg-primary/10' 
                          : 'border-border text-muted-foreground hover:border-muted-foreground'
                        }
                      `}
                    >
                      {difficulty === 'All' ? 'All' : difficulty.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </CyberCard>
          </motion.div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
              <p className="font-mono text-muted-foreground">Loading writeups...</p>
            </div>
          )}

          {/* Writeups Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredWriteups.map((writeup: Writeup, index: number) => (
                  <motion.div
                    key={writeup.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CyberCard 
                      variant="glow" 
                      className="p-6 h-full group cursor-pointer"
                      onClick={() => console.log('Open writeup:', writeup.slug)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-2 py-1 border font-mono text-xs ${platformColors[writeup.platform] || 'text-foreground border-border'}`}>
                          {writeup.platform}
                        </div>
                        {writeup.status === 'completed' ? (
                          <Unlock size={16} className="text-accent" />
                        ) : writeup.status === 'locked' ? (
                          <Lock size={16} className="text-destructive" />
                        ) : (
                          <div className="w-4 h-4 border border-primary animate-pulse" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {writeup.title}
                      </h3>

                      {/* Description */}
                      {writeup.description && (
                        <p className="font-mono text-sm text-muted-foreground mb-4 line-clamp-2">
                          {writeup.description}
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {writeup.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground font-mono text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-xs ${difficultyColors[writeup.difficulty]}`}>
                            {writeup.difficulty.toUpperCase()}
                          </span>
                          {writeup.points && (
                            <span className="font-mono text-xs text-muted-foreground">
                              {writeup.points} pts
                            </span>
                          )}
                        </div>
                        <StatusIndicator status={writeup.status} />
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={16} className="text-primary" />
                      </div>
                    </CyberCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredWriteups.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Terminal size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="font-mono text-muted-foreground">
                No writeups found. {writeups.length === 0 ? 'Add some writeups to get started.' : 'Try adjusting your filters.'}
              </p>
            </motion.div>
          )}

          {/* Stats footer */}
          {writeups.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap justify-center gap-8 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">TOTAL:</span>
                  <span className="text-foreground">{writeups.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">COMPLETED:</span>
                  <span className="text-accent">{writeups.filter((w: Writeup) => w.status === 'completed').length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">IN PROGRESS:</span>
                  <span className="text-primary">{writeups.filter((w: Writeup) => w.status === 'active').length}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Writeups;
