import { motion } from 'framer-motion';
import { Activity, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { SocialProfiles } from '@/entities';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [socialProfiles, setSocialProfiles] = useState<SocialProfiles[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <footer className="relative z-10 border-t border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-heading text-xs text-foreground">SYSTEM_ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-secondary" />
              <span className="font-heading text-xs text-foreground">CONNECTED</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {socialProfiles.map((profile) => (
              <motion.a
                key={profile._id}
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                title={profile.platform}
              >
                <span className="font-heading text-sm">{profile.platform?.substring(0, 2).toUpperCase()}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Timestamp */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <p className="font-heading text-xs text-foreground">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </p>
            <p className="font-heading text-xs text-foreground/60">
              {currentTime.toLocaleDateString('en-US')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-primary/10 text-center"
        >
          <p className="font-heading text-xs text-foreground/60">
            © {currentTime.getFullYear()} DEV_TERMINAL. All systems operational.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
