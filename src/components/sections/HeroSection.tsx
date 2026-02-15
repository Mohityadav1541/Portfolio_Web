import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Code2, Instagram, FileText } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { SocialProfiles } from '@/entities';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [socialProfiles, setSocialProfiles] = useState<SocialProfiles[]>([]);
  
  const lines = [
    '> Initializing Developer Profile...',
    '> Loading System Modules...',
    '> Establishing Secure Connection...',
    '> Access Granted',
    '',
    '> FULL STACK DEVELOPER',
    '> PROBLEM SOLVER',
    '> DSA ENTHUSIAST',
  ];

  useEffect(() => {
    loadSocialProfiles();
  }, []);

  const loadSocialProfiles = async () => {
    try {
      const { items } = await BaseCrudService.getAll<SocialProfiles>('socialprofiles');
      setSocialProfiles(items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Failed to load social profiles:', error);
    }
  };

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayText((prev) => prev + line[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
        setDisplayText((prev) => prev + '\n');
        setTimeout(() => setCurrentLine((prev) => prev + 1), 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLine]);

  const getIconForPlatform = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('github')) return Github;
    if (lower.includes('linkedin')) return Linkedin;
    if (lower.includes('instagram')) return Instagram;
    if (lower.includes('leetcode') || lower.includes('code')) return Code2;
    return ExternalLink;
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-[120rem] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-background/60 backdrop-blur-md border-2 border-primary/30 rounded-lg p-8 shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(0, 255, 0, 0.2)' }}
            >
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="ml-4 font-heading text-sm text-foreground/60">terminal@dev:~$</span>
              </div>
              
              <pre className="font-heading text-base text-primary whitespace-pre-wrap min-h-[300px]">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-primary ml-1"
                />
              </pre>
            </div>

            {/* Glowing Grid Overlay */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-purple/5 rounded-lg -z-10 blur-xl"></div>
          </motion.div>

          {/* Holographic Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {socialProfiles.map((profile, index) => {
              const Icon = getIconForPlatform(profile.platform || '');
              return (
                <motion.a
                  key={profile._id}
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group relative bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all duration-300"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)' }}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">{profile.platform}</h3>
                      {profile.shortDescription && (
                        <p className="font-heading text-xs text-foreground/60">{profile.shortDescription}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-heading text-xs text-foreground/60">SCROLL_DOWN</span>
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
