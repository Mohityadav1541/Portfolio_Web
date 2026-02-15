import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { GitHubRepositories } from '@/entities';
import { Star, GitBranch, ExternalLink, Clock } from 'lucide-react';

export default function GitHubSection() {
  const [repositories, setRepositories] = useState<GitHubRepositories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<GitHubRepositories>('githubrepositories');
      setRepositories(items.sort((a, b) => (b.starsCount || 0) - (a.starsCount || 0)));
    } catch (error) {
      console.error('Failed to load repositories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: '#f1e05a',
      typescript: '#3178c6',
      python: '#3572A5',
      java: '#b07219',
      cpp: '#f34b7d',
      c: '#555555',
      go: '#00ADD8',
      rust: '#dea584',
      ruby: '#701516',
      php: '#4F5D95',
    };
    return colors[language.toLowerCase()] || '#00FF00';
  };

  return (
    <section id="github" className="relative py-24 px-6">
      <div className="max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
            {'<'} GITHUB_REPOS {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/60">
            // Fetching repository data from remote server...
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : repositories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo, index) => (
                <motion.a
                  key={repo._id}
                  href={repo.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all"
                  style={{ 
                    boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Repository Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-primary" />
                      <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                        {repo.repositoryName}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Description */}
                  {repo.description && (
                    <p className="font-heading text-sm text-foreground/70 mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  {/* Stats & Language */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {repo.primaryLanguage && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ 
                              backgroundColor: getLanguageColor(repo.primaryLanguage),
                              boxShadow: `0 0 8px ${getLanguageColor(repo.primaryLanguage)}`,
                            }}
                          />
                          <span className="font-heading text-xs text-foreground/60">
                            {repo.primaryLanguage}
                          </span>
                        </div>
                      )}
                      {repo.starsCount !== undefined && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
                          <span className="font-heading text-xs text-foreground/60">
                            {repo.starsCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Updated */}
                  {repo.lastUpdated && (
                    <div className="flex items-center gap-1 mt-4 pt-4 border-t border-primary/10">
                      <Clock className="w-3 h-3 text-foreground/40" />
                      <span className="font-heading text-xs text-foreground/40">
                        Updated {new Date(repo.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
                  
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent)',
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-heading text-base text-foreground/60">No repositories found.</p>
            </div>
          )}
        </div>

        {/* GitHub Stats Summary */}
        {repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                label: 'Total Repositories',
                value: repositories.length,
                icon: '📦',
              },
              {
                label: 'Total Stars',
                value: repositories.reduce((sum, repo) => sum + (repo.starsCount || 0), 0),
                icon: '⭐',
              },
              {
                label: 'Languages Used',
                value: new Set(repositories.map(r => r.primaryLanguage).filter(Boolean)).size,
                icon: '💻',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 text-center hover:border-primary/60 transition-all"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)' }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="font-heading text-3xl text-primary mb-2">{stat.value}</div>
                <div className="font-heading text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
