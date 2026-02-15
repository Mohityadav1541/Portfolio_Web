import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Github, X, Calendar } from 'lucide-react';

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
      setProjects(items.sort((a, b) => 
        new Date(b.completionDate || 0).getTime() - new Date(a.completionDate || 0).getTime()
      ));
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-secondary mb-4">
            {'<'} PROJECTS_ARCHIVE {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/60">
            // Decrypting project database...
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-background/40 backdrop-blur-md border border-secondary/30 rounded-lg overflow-hidden cursor-pointer hover:border-secondary/60 transition-all"
                  style={{ 
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Project Image */}
                  {project.projectImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.projectImage}
                        alt={project.projectName || 'Project'}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80"></div>
                      
                      {/* Encrypted Overlay Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-secondary/10 backdrop-blur-sm flex items-center justify-center"
                      >
                        <span className="font-heading text-2xl text-secondary">DECRYPT</span>
                      </motion.div>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {project.projectName}
                    </h3>
                    {project.tagline && (
                      <p className="font-heading text-sm text-secondary/80 mb-3">{project.tagline}</p>
                    )}
                    {project.description && (
                      <p className="font-heading text-sm text-foreground/70 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="font-heading text-xs px-2 py-1 bg-secondary/10 border border-secondary/30 rounded text-secondary"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-foreground/60">
                      {project.liveDemoUrl && (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      {project.githubUrl && (
                        <Github className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, rotateX: -20 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8, rotateX: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-background/80 backdrop-blur-md border-2 border-secondary/50 rounded-lg overflow-hidden"
              style={{ 
                boxShadow: '0 0 60px rgba(0, 255, 255, 0.3)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-md border border-secondary/50 rounded-full flex items-center justify-center text-secondary hover:bg-secondary/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedProject.projectImage && (
                <div className="relative h-64 md:h-96">
                  <Image
                    src={selectedProject.projectImage}
                    alt={selectedProject.projectName || 'Project'}
                    width={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                </div>
              )}

              <div className="p-8">
                <h2 className="font-heading text-4xl text-secondary mb-4">
                  {selectedProject.projectName}
                </h2>
                
                {selectedProject.tagline && (
                  <p className="font-heading text-lg text-primary mb-6">{selectedProject.tagline}</p>
                )}

                {selectedProject.description && (
                  <div className="mb-6">
                    <h3 className="font-heading text-sm text-foreground/60 mb-2">{'>'} DESCRIPTION</h3>
                    <p className="font-heading text-base text-foreground/90">{selectedProject.description}</p>
                  </div>
                )}

                {selectedProject.techStack && (
                  <div className="mb-6">
                    <h3 className="font-heading text-sm text-foreground/60 mb-3">{'>'} TECH_STACK</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="font-heading text-sm px-3 py-1 bg-secondary/10 border border-secondary/30 rounded text-secondary"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.completionDate && (
                  <div className="mb-6 flex items-center gap-2 text-foreground/60">
                    <Calendar className="w-4 h-4" />
                    <span className="font-heading text-sm">
                      Completed: {new Date(selectedProject.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-heading text-sm rounded hover:bg-secondary/90 transition-colors"
                      style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      LIVE_DEMO
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-secondary text-secondary font-heading text-sm rounded hover:bg-secondary/10 transition-colors"
                      style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}
                    >
                      <Github className="w-4 h-4" />
                      VIEW_CODE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
