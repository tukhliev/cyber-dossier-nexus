import { motion } from 'framer-motion';
import { User, Terminal, Shield, Award, Github, Linkedin, Twitter, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { CyberCard } from '../components/ui/CyberCard';
import { GlitchText, NeonText } from '../components/ui/GlitchText';
import { TerminalText } from '../components/ui/TerminalText';
import { CyberButton } from '../components/ui/CyberButton';

const skills = [
  { name: 'Web Exploitation', level: 95 },
  { name: 'Binary Exploitation', level: 80 },
  { name: 'Reverse Engineering', level: 75 },
  { name: 'Cryptography', level: 70 },
  { name: 'Active Directory', level: 90 },
  { name: 'Network Pentesting', level: 85 },
];

const certifications = [
  { name: 'OSCP', issuer: 'Offensive Security', year: '2023' },
  { name: 'eWPT', issuer: 'eLearnSecurity', year: '2022' },
  { name: 'CEH', issuer: 'EC-Council', year: '2021' },
];

const achievements = [
  { title: 'HTB Pro Hacker', description: 'Top 1% globally', icon: Award },
  { title: 'TryHackMe Elite', description: '500+ rooms completed', icon: Shield },
  { title: 'CTF Champion', description: 'Multiple podium finishes', icon: Award },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, url: '#' },
  { name: 'LinkedIn', icon: Linkedin, url: '#' },
  { name: 'Twitter', icon: Twitter, url: '#' },
  { name: 'Email', icon: Mail, url: 'mailto:contact@hacker.dev' },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none opacity-20 z-0" />

      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-primary" />
              <span className="font-mono text-xs text-muted-foreground tracking-widest">
                /home/hacker/about
              </span>
            </div>
            <GlitchText 
              text="OPERATOR DOSSIER" 
              as="h1" 
              className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <CyberCard variant="elevated" className="p-6 sticky top-24">
                {/* Avatar placeholder */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 border-2 border-primary animate-rotate-slow" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                  <div className="absolute inset-2 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <Terminal size={40} className="text-primary" />
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-display text-2xl text-center text-foreground mb-2">
                  CYBER OPERATOR
                </h2>
                <p className="font-mono text-sm text-center text-primary mb-6">
                  @hacker_handle
                </p>

                {/* Status */}
                <div className="border border-border p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs text-accent">STATUS: ACTIVE</span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground space-y-1">
                    <div>CLEARANCE: <span className="text-warning">MAXIMUM</span></div>
                    <div>SPECIALIZATION: <span className="text-foreground">OFFENSIVE SECURITY</span></div>
                    <div>LOCATION: <span className="text-foreground">REDACTED</span></div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="p-2 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.icon size={18} />
                    </a>
                  ))}
                </div>
              </CyberCard>
            </motion.div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CyberCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal size={16} className="text-accent" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest">
                      BIOGRAPHICAL_DATA.TXT
                    </span>
                  </div>
                  
                  <div className="font-mono text-sm text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      <span className="text-accent">&gt;</span> Offensive security professional with 5+ years of experience in penetration testing and vulnerability research.
                    </p>
                    <p>
                      <span className="text-accent">&gt;</span> Specializing in web application security, Active Directory exploitation, and binary analysis. Passionate about CTF competitions and sharing knowledge through detailed writeups.
                    </p>
                    <p>
                      <span className="text-accent">&gt;</span> Currently focusing on advanced adversary simulation and red team operations. Always learning, always hacking.
                    </p>
                  </div>
                </CyberCard>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CyberCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield size={16} className="text-primary" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest">
                      SKILL_MATRIX
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-sm text-foreground">{skill.name}</span>
                          <span className="font-mono text-sm text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-primary to-accent"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CyberCard>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <CyberCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Award size={16} className="text-warning" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest">
                      CERTIFICATIONS
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="border border-border p-4 text-center hover:border-primary transition-colors group"
                      >
                        <div className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                          {cert.name}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mt-1">
                          {cert.issuer}
                        </div>
                        <div className="font-mono text-xs text-accent mt-1">
                          {cert.year}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CyberCard>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <CyberCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Award size={16} className="text-accent" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest">
                      ACHIEVEMENTS
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="border border-border p-4 hover:border-accent transition-colors group"
                      >
                        <achievement.icon size={24} className="text-accent mb-3 group-hover:scale-110 transition-transform" />
                        <div className="font-mono text-sm text-foreground">
                          {achievement.title}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mt-1">
                          {achievement.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CyberCard>
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <CyberCard variant="glow" className="p-8 text-center">
                  <h3 className="font-display text-2xl text-foreground mb-4">
                    INITIATE CONTACT
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    Interested in collaboration, consulting, or just want to chat about security? Let's connect.
                  </p>
                  <CyberButton variant="primary" size="lg">
                    <Mail size={16} />
                    <span>SEND TRANSMISSION</span>
                  </CyberButton>
                </CyberCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
