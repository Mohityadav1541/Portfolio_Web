import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Code2, Instagram, Mail } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { SocialProfiles } from '@/entities';
import Robot3D from '@/components/effects/Robot3D';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [socialProfiles, setSocialProfiles] = useState<SocialProfiles[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const lines = [
    '> Initializing Developer Profile...',
    '> Loading System Modules...',
    '> Establishing Secure Connection...',
    '> Access Granted',
    '',
    '> FULL STACK DEVELOPER',
    '> PROBLEM SOLVER',
    '> B.Tech @ SVNIT SURAT',
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
    }, 45);
    return () => clearInterval(interval);
  }, [currentLine]);

  const getIconForPlatform = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('github')) return Github;
    if (lower.includes('linkedin')) return Linkedin;
    if (lower.includes('instagram')) return Instagram;
    if (lower.includes('email') || lower.includes('mail')) return Mail;
    if (lower.includes('leetcode') || lower.includes('code')) return Code2;
    return ExternalLink;
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 overflow-hidden"
    >
      {/* Animated grid floor */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transform: 'perspective(800px) rotateX(25deg)',
        transformOrigin: 'bottom',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)',
      }} />

      {/* Corner brackets */}
      {[
        'top-6 left-6 border-l-2 border-t-2',
        'top-6 right-6 border-r-2 border-t-2',
        'bottom-6 left-6 border-l-2 border-b-2',
        'bottom-6 right-6 border-r-2 border-b-2',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 border-primary/40 ${cls}`} />
      ))}

      <div className="max-w-[120rem] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

          {/* ── LEFT: Terminal ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Name badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="font-heading text-xs text-primary/80 tracking-[0.4em]">MOHIT YADAV // ECE @ SVNIT</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/60" />
            </motion.div>

            {/* Terminal window */}
            <div
              className="relative bg-background/60 backdrop-blur-xl border-2 border-primary/30 rounded-xl p-6 shadow-2xl"
              style={{
                boxShadow: '0 0 60px rgba(0,255,0,0.15), inset 0 0 30px rgba(0,255,0,0.03)',
              }}
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,50,50,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,200,0,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                <span className="ml-3 font-heading text-xs text-foreground/40">mohit@svnit:~$</span>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-auto w-2 h-3 bg-primary/40"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <pre className="font-heading text-sm text-primary whitespace-pre-wrap min-h-[260px] leading-6">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                    />
                  </pre>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 relative shrink-0 group mx-auto sm:mx-0 mt-4 sm:mt-0"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-500" />
                  <div className="absolute inset-0 border-2 border-primary/40 rounded-lg overflow-hidden z-10 p-1">
                    <div className="w-full h-full relative rounded overflow-hidden">
                      <img 
                        src="/profile-photo.jpg" 
                        alt="Profile" 
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 contrast-125 brightness-90" 
                      />
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                      {/* Scanline effect over image */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                    </div>
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary z-20" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary z-20" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary z-20" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary z-20" />
                </motion.div>
              </div>

              {/* Scan line */}
              <motion.div
                animate={{ y: [0, 280, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
                style={{ top: 72 }}
              />
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3"
            >
              {socialProfiles.map((profile, i) => {
                const Icon = getIconForPlatform(profile.platform || '');
                return (
                  <motion.a
                    key={profile._id}
                    href={profile.profileUrl}
                    target={profile.profileUrl?.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-background/50 border border-primary/30 rounded-lg font-heading text-xs text-foreground hover:text-primary hover:border-primary/60 transition-all"
                    style={{ boxShadow: '0 0 15px rgba(0,255,0,0.08)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {profile.platform}
                  </motion.a>
                );
              })}

              {/* Resume button */}
              <motion.a
                href="/resume.pdf"
                download="Mohit_Yadav_Resume.pdf"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border-2 border-primary text-primary rounded-lg font-heading text-xs hover:bg-primary/20 transition-all"
                style={{ boxShadow: '0 0 20px rgba(0,255,0,0.25)' }}
              >
                ↓ RESUME.PDF
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D Robot ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            style={{ height: '560px' }}
          >
            {/* Glow base under robot */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(ellipse, rgba(0,255,0,0.4) 0%, transparent 70%)' }}
            />

            {/* HUD frame */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner brackets for robot frame */}
              {[
                'top-0 left-0 border-l-2 border-t-2',
                'top-0 right-0 border-r-2 border-t-2',
                'bottom-0 left-0 border-l-2 border-b-2',
                'bottom-0 right-0 border-r-2 border-b-2',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 border-primary/50 ${cls}`} />
              ))}

              {/* HUD labels */}
              <div className="absolute top-2 left-2 font-heading text-[10px] text-primary/60">[ UNIT_MK1 ]</div>
              <div className="absolute top-2 right-2 font-heading text-[10px] text-primary/60">SYS_ONLINE</div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-2 left-2 font-heading text-[10px] text-secondary/60"
              >
                ● TRACKING
              </motion.div>
              <div className="absolute bottom-2 right-2 font-heading text-[10px] text-primary/60">PWR: 100%</div>
            </div>

            <Robot3D />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <span className="font-heading text-xs text-foreground/40 tracking-widest">SCROLL_DOWN</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-primary/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-0.5 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
