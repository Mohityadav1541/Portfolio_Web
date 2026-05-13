import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ExternalLink, Github, X, Calendar, Zap } from 'lucide-react';

// ── 3D Tilt Card wrapper ──────────────────────────────────────────────────
function TiltCard({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -12;
    const rotY = ((x - cx) / cx) * 12;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

    // Holographic highlight follows cursor
    const highlight = card.querySelector('.holo-highlight') as HTMLElement;
    if (highlight) {
      highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.18) 0%, rgba(0,255,0,0.06) 40%, transparent 70%)`;
    }
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const highlight = card.querySelector('.holo-highlight') as HTMLElement;
    if (highlight) highlight.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative cursor-pointer ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
    >
      {children}
      {/* Holographic shine layer */}
      <div className="holo-highlight absolute inset-0 rounded-xl pointer-events-none transition-all duration-100 z-10" />
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<Projects>('projects');
      setProjects(items); // order is controlled in service.ts
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const techColors = ['#00ff00', '#00ffff', '#8a2be2', '#ff6b6b', '#ffd700'];

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">

      {/* 3D depth glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,255,255,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-[120rem] mx-auto">
        {/* Section header with chromatic aberration */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2
            className="font-heading text-5xl md:text-6xl text-secondary mb-4 relative"
            data-text="< PROJECTS_ARCHIVE >"
          >
            {'<'} PROJECTS_ARCHIVE {'>'}
            {/* Chromatic aberration layers */}
            <span className="absolute inset-0 text-[#ff0040]/30 select-none pointer-events-none" style={{ transform: 'translate(-3px, 0)' }}>
              {'<'} PROJECTS_ARCHIVE {'>'}
            </span>
            <span className="absolute inset-0 text-[#0040ff]/30 select-none pointer-events-none" style={{ transform: 'translate(3px, 0)' }}>
              {'<'} PROJECTS_ARCHIVE {'>'}
            </span>
          </h2>
          <p className="font-heading text-base text-foreground/50">// Decrypting project database...</p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-background/20 border border-secondary/10 animate-pulse" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
                >
                  <TiltCard
                    className="h-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div
                      className="group relative bg-background/40 backdrop-blur-xl border border-secondary/25 rounded-xl overflow-hidden h-full flex flex-col hover:border-secondary/50 transition-all duration-300"
                      style={{ boxShadow: '0 0 30px rgba(0,255,255,0.08), 0 20px 60px rgba(0,0,0,0.4)' }}
                    >
                      {/* Top accent line */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

                      {/* Number badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span
                          className="font-heading text-xs px-2 py-1 rounded border border-secondary/30 text-secondary/60"
                          style={{ background: 'rgba(0,0,0,0.5)' }}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      {/* 3D floating project name layer */}
                      <div className="p-6 pt-12 flex flex-col flex-1">
                        <div style={{ transform: 'translateZ(20px)' }}>
                          <h3 className="font-heading text-xl text-foreground mb-1 group-hover:text-secondary transition-colors">
                            {project.projectName}
                          </h3>
                          {project.tagline && (
                            <p className="font-heading text-xs text-secondary/70 mb-3">{project.tagline}</p>
                          )}
                        </div>

                        {project.description && (
                          <p className="font-heading text-sm text-foreground/60 mb-4 line-clamp-3 flex-1">
                            {project.description}
                          </p>
                        )}

                        {/* Tech tags */}
                        {project.techStack && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.techStack.split(',').slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="font-heading text-[10px] px-2 py-0.5 rounded-full border"
                                style={{
                                  borderColor: `${techColors[i % techColors.length]}40`,
                                  color: techColors[i % techColors.length],
                                  background: `${techColors[i % techColors.length]}10`,
                                  boxShadow: `0 0 8px ${techColors[i % techColors.length]}20`,
                                }}
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Links row */}
                        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-secondary/10">
                          {project.liveDemoUrl && (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-1 font-heading text-xs text-secondary hover:brightness-125 transition-all"
                            >
                              <ExternalLink className="w-3 h-3" /> LIVE
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-1 font-heading text-xs text-foreground/50 hover:text-primary transition-all"
                            >
                              <Github className="w-3 h-3" /> CODE
                            </a>
                          )}
                          <span className="ml-auto font-heading text-xs text-foreground/30">
                            {project.completionDate && new Date(project.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Bottom glow bar on hover */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary origin-left"
                      />

                      {/* Corner decoration */}
                      <div className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-60 transition-opacity">
                        <Zap className="w-4 h-4 text-secondary" />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-heading text-base text-foreground/60">No projects found in database.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.7, rotateX: -25, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.7, rotateX: 25, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(0,20,20,0.95) 100%)',
                border: '1px solid rgba(0,255,255,0.3)',
                boxShadow: '0 0 80px rgba(0,255,255,0.2), 0 0 20px rgba(0,255,0,0.1)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              {/* Top bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-accent-purple" />

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/60 border border-secondary/40 flex items-center justify-center text-secondary hover:bg-secondary/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div>
                    <h2 className="font-heading text-3xl text-secondary mb-1">{selectedProject.projectName}</h2>
                    {selectedProject.tagline && (
                      <p className="font-heading text-sm text-primary">{selectedProject.tagline}</p>
                    )}
                  </div>
                </div>

                {selectedProject.description && (
                  <div className="mb-6 p-4 rounded-lg bg-background/40 border border-primary/10">
                    <h3 className="font-heading text-xs text-foreground/50 mb-2">{'>'} DESCRIPTION</h3>
                    <p className="font-heading text-sm text-foreground/85 leading-relaxed">{selectedProject.description}</p>
                  </div>
                )}

                {selectedProject.techStack && (
                  <div className="mb-6">
                    <h3 className="font-heading text-xs text-foreground/50 mb-3">{'>'} TECH_STACK</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="font-heading text-xs px-3 py-1 rounded-full border"
                          style={{
                            borderColor: `${techColors[i % techColors.length]}50`,
                            color: techColors[i % techColors.length],
                            background: `${techColors[i % techColors.length]}10`,
                          }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.completionDate && (
                  <div className="mb-6 flex items-center gap-2 text-foreground/50">
                    <Calendar className="w-4 h-4" />
                    <span className="font-heading text-xs">
                      Completed: {new Date(selectedProject.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveDemoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/90 text-black font-heading text-sm rounded-lg hover:bg-secondary transition-colors"
                      style={{ boxShadow: '0 0 25px rgba(0,255,255,0.4)' }}
                    >
                      <ExternalLink className="w-4 h-4" /> LIVE_DEMO
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-heading text-sm rounded-lg hover:bg-primary/10 transition-colors"
                      style={{ boxShadow: '0 0 20px rgba(0,255,0,0.2)' }}
                    >
                      <Github className="w-4 h-4" /> VIEW_CODE
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
