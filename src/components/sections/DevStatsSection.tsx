import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Layers, GitBranch, Cpu, Zap, Globe, Users, Star, Trophy, Rocket } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  glow: string;
  description: string;
}

const STATS: Stat[] = [
  {
    label: 'LINKEDIN_FOLLOWERS',
    value: 2400,
    suffix: '+',
    icon: <Users className="w-7 h-7" />,
    color: 'text-secondary',
    border: 'border-secondary/30',
    glow: 'rgba(0,255,255,0.18)',
    description: 'Professional network & community reach',
  },
  {
    label: 'PROJECTS_SHIPPED',
    value: 12,
    suffix: '+',
    icon: <Rocket className="w-7 h-7" />,
    color: 'text-primary',
    border: 'border-primary/30',
    glow: 'rgba(0,255,0,0.18)',
    description: 'Full-stack web, mobile & AR apps live',
  },
  {
    label: 'CAFES_IMPACTED',
    value: 100,
    suffix: '+',
    icon: <Globe className="w-7 h-7" />,
    color: 'text-accent-purple',
    border: 'border-accent-purple/30',
    glow: 'rgba(138,43,226,0.18)',
    description: 'Restaurants streamlined via Menuura APIs',
  },
  {
    label: 'GITHUB_COMMITS',
    value: 300,
    suffix: '+',
    icon: <GitBranch className="w-7 h-7" />,
    color: 'text-primary',
    border: 'border-primary/30',
    glow: 'rgba(0,255,0,0.18)',
    description: 'Commits across public & private repos',
  },
  {
    label: 'TECHNOLOGIES',
    value: 20,
    suffix: '+',
    icon: <Cpu className="w-7 h-7" />,
    color: 'text-secondary',
    border: 'border-secondary/30',
    glow: 'rgba(0,255,255,0.18)',
    description: 'Frameworks, languages & cloud tools',
  },
  {
    label: 'HOURS_CODED',
    value: 1200,
    suffix: '+',
    icon: <Code2 className="w-7 h-7" />,
    color: 'text-accent-purple',
    border: 'border-accent-purple/30',
    glow: 'rgba(138,43,226,0.18)',
    description: 'Coding hours logged in 2025–26',
  },
];

const ACHIEVEMENTS = [
  { emoji: '🏆', label: 'Top 1% LinkedIn Creator', sub: 'ECE domain — SVNIT Surat' },
  { emoji: '🚀', label: 'Production Apps Live', sub: '6 deployed on Vercel' },
  { emoji: '🤖', label: 'AR + AI Integration', sub: '3D food visualization & photo scan' },
  { emoji: '📡', label: 'REST APIs at Scale', sub: 'Serving 100+ restaurant clients' },
];

const HIGHLIGHTS = [
  { icon: <Zap className="w-4 h-4" />, label: 'React.js / Next.js', desc: 'Primary frontend stack', color: 'text-primary' },
  { icon: <Globe className="w-4 h-4" />, label: 'Node.js / Express / Spring Boot', desc: 'Backend & REST APIs', color: 'text-secondary' },
  { icon: <Cpu className="w-4 h-4" />, label: 'MongoDB / PostgreSQL / MySQL', desc: 'Database experience', color: 'text-accent-purple' },
  { icon: <Code2 className="w-4 h-4" />, label: 'TypeScript / Python / C++', desc: 'Core languages', color: 'text-primary' },
  { icon: <Layers className="w-4 h-4" />, label: 'Three.js / React Native / AR', desc: 'Specialized domains', color: 'text-secondary' },
  { icon: <GitBranch className="w-4 h-4" />, label: 'Git / Docker / AWS / Vercel', desc: 'DevOps & cloud tools', color: 'text-accent-purple' },
  { icon: <Star className="w-4 h-4" />, label: 'SEO / Meta Tags / Sitemap', desc: 'Google-ready optimization', color: 'text-primary' },
  { icon: <Trophy className="w-4 h-4" />, label: 'Cloudinary / Nodemailer / JWT', desc: 'Auth & media pipelines', color: 'text-secondary' },
];

function AnimatedCounter({ target, suffix, prefix, color }: { target: number; suffix: string; prefix?: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className={`font-heading text-5xl font-bold ${color}`}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function DevStatsSection() {
  return (
    <section id="stats" className="relative py-24 px-6 overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,0,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-[120rem] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4 glitch-text">
            {'<'} DEV_METRICS {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/50">
            // Compiling development statistics...
          </p>
        </motion.div>

        {/* Stat cards — 3 col on large */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`relative bg-background/40 backdrop-blur-md border ${stat.border} rounded-xl p-6 overflow-hidden group transition-all`}
              style={{
                boxShadow: `0 0 30px ${stat.glow}`,
                transformStyle: 'preserve-3d',
                perspective: '800px',
              }}
            >
              {/* Top icon row */}
              <div className={`flex items-center justify-between mb-5 ${stat.color}`}>
                {stat.icon}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className={`w-2 h-2 rounded-full bg-current`}
                  style={{ boxShadow: `0 0 10px currentColor` }}
                />
              </div>

              {/* Label */}
              <p className="font-heading text-[11px] text-foreground/50 mb-2 tracking-widest">{stat.label}</p>

              {/* Animated number */}
              <AnimatedCounter target={stat.value} suffix={stat.suffix} color={stat.color} />

              {/* Description */}
              <p className="font-heading text-xs text-foreground/40 mt-3">{stat.description}</p>

              {/* Bottom progress bar */}
              <div className="mt-4 h-0.5 bg-background/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.1 + 0.4 }}
                  className={`h-full`}
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.glow.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')')})` }}
                />
              </div>

              {/* Hover shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

              {/* Corner bracket */}
              <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r ${stat.border} opacity-60`} />
            </motion.div>
          ))}
        </div>

        {/* ── Achievements banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-background/30 backdrop-blur border border-secondary/15 hover:border-secondary/40 transition-all group"
              style={{ boxShadow: '0 0 20px rgba(0,255,255,0.05)' }}
            >
              <span className="text-3xl flex-shrink-0">{ach.emoji}</span>
              <div>
                <p className="font-heading text-sm text-foreground group-hover:text-secondary transition-colors">{ach.label}</p>
                <p className="font-heading text-xs text-foreground/40">{ach.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech highlights grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-background/30 backdrop-blur-md border border-primary/20 rounded-xl p-8"
          style={{ boxShadow: '0 0 40px rgba(0,255,0,0.08)' }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20">
            <Code2 className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-xl text-primary">ACTIVE_TECH_STACK</h3>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-auto flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 8px rgba(0,255,0,0.8)' }} />
              <span className="font-heading text-xs text-primary/60">LIVE</span>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 6, scale: 1.02 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className={`${item.color} flex-shrink-0`}>{item.icon}</div>
                <div>
                  <p className={`font-heading text-sm ${item.color} group-hover:brightness-125 transition-all`}>{item.label}</p>
                  <p className="font-heading text-xs text-foreground/40">{item.desc}</p>
                </div>
                <div className={`ml-auto w-1 h-6 rounded-full bg-current opacity-30 ${item.color}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
