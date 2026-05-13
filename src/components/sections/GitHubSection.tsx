import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitBranch, ExternalLink, Clock, Users, GitFork, Globe } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

interface GitHubUser {
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  bio: string;
}

const GITHUB_USER = 'Mohityadav1541';

// Best repos to always pin (by name)
const PINNED_REPOS = [
  'WELLNESS_CLUB_SVNIT',
  'bloom-branding',
  'sanwaliya-photo-studio',
  'task_of_reactNative',
  'avasaar_raw',
];

// Rich fallback descriptions shown when GitHub API returns null
const REPO_DESCRIPTIONS: Record<string, string> = {
  'WELLNESS_CLUB_SVNIT': 'Production-ready event management platform for SVNIT\'s Wellness Club — automated emails, analytics dashboards, AI certificate generation via Cloudinary + Node-Cron.',
  'bloom-branding': 'Modern branding & marketing agency website with smooth Framer Motion animations, fully responsive layout, and SEO-optimised deployment on Vercel.',
  'sanwaliya-photo-studio': 'Professional photography studio booking platform with online scheduling, portfolio gallery, and client management. SEO-tuned with structured data & sitemap.',
  'task_of_reactNative': 'Production-grade cross-platform mobile app — REST API integration, Redux state management, search & pagination, offline persistence with AsyncStorage.',
  'avasaar_raw': 'Avasar EdTech LMS — scalable learning management system with video streaming, course management, student dashboards, and Cloudinary media delivery.',
  'Menuuara': 'AR-powered restaurant POS system — customers visualise dishes as 3D models before ordering. Spring Boot REST APIs deployed to 100+ cafes & restaurants.',
};

export default function GitHubSection() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    setIsLoading(true);
    try {
      const [reposRes, userRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`),
        fetch(`https://api.github.com/users/${GITHUB_USER}`),
      ]);

      if (reposRes.ok) {
        const allRepos: GitHubRepo[] = await reposRes.json();
        // Pick pinned first, then fill with non-fork repos sorted by updated
        const pinned = PINNED_REPOS
          .map(name => allRepos.find(r => r.name === name))
          .filter(Boolean) as GitHubRepo[];
        const others = allRepos
          .filter(r => !r.fork && !PINNED_REPOS.includes(r.name))
          .slice(0, 3 - pinned.length);
        setRepositories([...pinned, ...others].slice(0, 6));
      }

      if (userRes.ok) {
        const user: GitHubUser = await userRes.json();
        setGithubUser(user);
      }
    } catch (err) {
      console.error('GitHub API error:', err);
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
      'c++': '#f34b7d',
      c: '#555555',
      go: '#00ADD8',
      rust: '#dea584',
    };
    return colors[language.toLowerCase()] || '#00FF00';
  };

  const IMPACT_STATS = [
    {
      label: 'LinkedIn Followers',
      value: '2,400+',
      icon: <Users className="w-5 h-5" />,
      color: 'text-secondary',
      border: 'border-secondary/30',
      glow: 'rgba(0,255,255,0.15)',
      link: 'https://www.linkedin.com/in/mohit-yadav-3a8957310/',
      sub: 'Professional network',
    },
    {
      label: 'Public Repos',
      value: githubUser?.public_repos ?? '—',
      icon: <GitBranch className="w-5 h-5" />,
      color: 'text-primary',
      border: 'border-primary/30',
      glow: 'rgba(0,255,0,0.15)',
      link: `https://github.com/${GITHUB_USER}?tab=repositories`,
      sub: 'Open source projects',
    },
    {
      label: 'Restaurants Served',
      value: '100+',
      icon: <Globe className="w-5 h-5" />,
      color: 'text-accent-purple',
      border: 'border-accent-purple/30',
      glow: 'rgba(138,43,226,0.15)',
      link: 'https://github.com/GarvXlearner/Menuuara',
      sub: 'Via Menuura Spring Boot APIs',
    },
    {
      label: 'Apps Live on Vercel',
      value: '6',
      icon: <Star className="w-5 h-5" />,
      color: 'text-[#FFD700]',
      border: 'border-yellow-500/30',
      glow: 'rgba(255,215,0,0.15)',
      link: `https://github.com/${GITHUB_USER}`,
      sub: 'Production deployments',
    },
  ];

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
            // Live data fetched from GitHub API
          </p>
        </motion.div>

        {/* Social Stats Bar — impactful metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {IMPACT_STATS.map((stat, i) => (
            <motion.a
              key={i}
              href={stat.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-background/40 backdrop-blur-md border ${stat.border} rounded-lg p-5 flex flex-col items-center gap-1 hover:brightness-110 transition-all cursor-pointer`}
              style={{ boxShadow: `0 0 25px ${stat.glow}` }}
            >
              <div className={stat.color}>{stat.icon}</div>
              <span className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="font-heading text-xs text-foreground/50 text-center">{stat.label}</span>
              <span className="font-heading text-[10px] text-foreground/30 text-center">{stat.sub}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Repository Cards */}
        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-background/20 border border-primary/10 rounded-lg p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : repositories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all flex flex-col"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)' }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch className="w-4 h-4 text-primary flex-shrink-0" />
                      <h3 className="font-heading text-base text-foreground group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h3>
                    </div>
                    <div className="flex gap-2 ml-2 flex-shrink-0">
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          title="Live Demo"
                          className="text-secondary hover:text-secondary/80 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        title="GitHub"
                        className="text-foreground/40 group-hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-heading text-xs text-foreground/60 mb-4 flex-1 line-clamp-3">
                    {repo.description || 'No description available.'}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                              boxShadow: `0 0 6px ${getLanguageColor(repo.language)}`,
                            }}
                          />
                          <span className="font-heading text-xs text-foreground/50">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FFD700]" fill="#FFD700" />
                        <span className="font-heading text-xs text-foreground/50">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-foreground/40" />
                        <span className="font-heading text-xs text-foreground/50">{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>

                  {/* Updated */}
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-primary/10">
                    <Clock className="w-3 h-3 text-foreground/30" />
                    <span className="font-heading text-xs text-foreground/30">
                      {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-heading text-base text-foreground/60">No repositories found.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-heading text-sm rounded hover:bg-primary/10 transition-colors"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' }}
          >
            <ExternalLink className="w-4 h-4" />
            VIEW_ALL_REPOS
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
