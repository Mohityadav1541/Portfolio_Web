import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CodingStats } from '@/entities';
import { Trophy, Flame, Target, TrendingUp, ExternalLink } from 'lucide-react';

export default function CodingStatsSection() {
  const [stats, setStats] = useState<CodingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({
    problems: 0,
    streak: 0,
    ranking: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<CodingStats>('codingstats');
      if (items.length > 0) {
        const latestStats = items[0];
        setStats(latestStats);
        animateCounters(latestStats);
      }
    } catch (error) {
      console.error('Failed to load coding stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const animateCounters = (statsData: CodingStats) => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      // problemsSolvedCount is the goal (100); current is progressIndicatorValue (35)
      const currentSolved = (statsData as any).currentSolved ?? statsData.progressIndicatorValue ?? 35;
      setAnimatedValues({
        problems: Math.floor(currentSolved * progress),
        streak: Math.floor((statsData.dailyStreakCount || 0) * progress),
        ranking: Math.floor((statsData.globalRanking || 0) * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          problems: currentSolved,
          streak: statsData.dailyStreakCount || 0,
          ranking: statsData.globalRanking || 0,
        });
      }
    }, interval);
  };

  return (
    <section id="stats" className="relative py-24 px-6">
      <div className="max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
            {'<'} CODING_DASHBOARD {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/60">
            // Real-time DSA performance metrics
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : stats ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* DSA Goal Tracker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all group relative overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.15)' }}
              >
                {/* IN PROGRESS badge */}
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-3 right-3 bg-primary/20 border border-primary/40 rounded px-2 py-0.5"
                >
                  <span className="font-heading text-[10px] text-primary">IN_PROGRESS</span>
                </motion.div>

                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xs text-foreground/60">DSA_CHALLENGE</h3>
                </div>

                {/* Goal fraction */}
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-heading text-4xl text-primary">{animatedValues.problems}</span>
                  <span className="font-heading text-xl text-foreground/40 mb-1">/ 100</span>
                </div>
                <p className="font-heading text-xs text-foreground/40 mb-3">problems solved</p>

                {/* Progress bar with % */}
                <div className="h-2 bg-background/60 rounded-full overflow-hidden border border-primary/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.progressIndicatorValue || 35}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)' }}
                  />
                </div>
                <p className="font-heading text-xs text-primary/70 mt-1 text-right">
                  {stats.progressIndicatorValue || 35}% to goal 🎯
                </p>
              </motion.div>

              {/* Daily Streak */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-background/40 backdrop-blur-md border border-secondary/30 rounded-lg p-6 hover:border-secondary/60 transition-all group"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Flame className="w-8 h-8 text-secondary" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-secondary"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
                  />
                </div>
                <h3 className="font-heading text-sm text-foreground/60 mb-2">DAILY_STREAK</h3>
                <p className="font-heading text-4xl text-secondary mb-2">{animatedValues.streak}</p>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="h-full bg-secondary"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
                  />
                </div>
              </motion.div>

              {/* Global Ranking */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background/40 backdrop-blur-md border border-accent-purple/30 rounded-lg p-6 hover:border-accent-purple/60 transition-all group"
                style={{ boxShadow: '0 0 30px rgba(138, 43, 226, 0.15)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-8 h-8 text-accent-purple" />
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-accent-purple"
                    style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)' }}
                  />
                </div>
                <h3 className="font-heading text-sm text-foreground/60 mb-2">GLOBAL_RANK</h3>
                <p className="font-heading text-4xl text-accent-purple mb-2">#{animatedValues.ranking}</p>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-accent-purple"
                    style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)' }}
                  />
                </div>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all group"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.15)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-2 h-2 rounded-full bg-primary"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)' }}
                  />
                </div>
                <h3 className="font-heading text-sm text-foreground/60 mb-2">PROGRESS</h3>
                <p className="font-heading text-4xl text-primary mb-2">
                  {stats.progressIndicatorValue || 0}%
                </p>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.progressIndicatorValue || 0}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="h-full bg-primary"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)' }}
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-heading text-base text-foreground/60">No coding stats available.</p>
            </div>
          )}

          {/* Dashboard Title & Profile Link */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              {stats.dashboardTitle && (
                <h3 className="font-heading text-2xl text-foreground mb-4">{stats.dashboardTitle}</h3>
              )}
              {stats.profileUrl && (
                <a
                  href={stats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary text-primary font-heading text-sm rounded hover:bg-primary/10 transition-colors"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  VIEW_PROFILE
                </a>
              )}
              {stats.lastUpdated && (
                <p className="font-heading text-xs text-foreground/60 mt-4">
                  Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
