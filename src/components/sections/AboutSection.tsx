import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Skills, Experience, Education } from '@/entities';
import { Image } from '@/components/ui/image';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

export default function AboutSection() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [skillsData, experienceData, educationData] = await Promise.all([
        BaseCrudService.getAll<Skills>('skills'),
        BaseCrudService.getAll<Experience>('experience'),
        BaseCrudService.getAll<Education>('education'),
      ]);
      setSkills(skillsData.items);
      setExperience(experienceData.items.sort((a, b) => 
        new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()
      ));
      setEducation(educationData.items.sort((a, b) => (b.startYear || 0) - (a.startYear || 0)));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
            {'<'} SYSTEM_INFO {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/60">
            // Analyzing developer capabilities and credentials
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Skills Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-background/40 backdrop-blur-md border border-secondary/30 rounded-lg p-8"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)' }}
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-secondary/20">
                    <Code className="w-6 h-6 text-secondary" />
                    <h3 className="font-heading text-2xl text-secondary">TECH_STACK</h3>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                      <div key={category}>
                        <h4 className="font-heading text-sm text-foreground/80 mb-3">
                          {'>'} {category.toUpperCase()}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {categorySkills.map((skill) => (
                            <motion.div
                              key={skill._id}
                              whileHover={{ scale: 1.05 }}
                              className="bg-background/60 border border-secondary/20 rounded px-3 py-2 text-center group hover:border-secondary/50 transition-all"
                            >
                              {skill.skillImage && (
                                <div className="w-8 h-8 mx-auto mb-2">
                                  <Image
                                    src={skill.skillImage}
                                    alt={skill.skillName || 'Skill'}
                                    width={32}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                              <p className="font-heading text-xs text-foreground group-hover:text-secondary transition-colors">
                                {skill.skillName}
                              </p>
                              {skill.proficiencyLevel !== undefined && (
                                <div className="mt-2 h-1 bg-background rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.proficiencyLevel}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full bg-secondary"
                                    style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Experience & Education Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Experience */}
                <div className="bg-background/40 backdrop-blur-md border border-primary/30 rounded-lg p-8"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.15)' }}
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h3 className="font-heading text-2xl text-primary">EXPERIENCE</h3>
                  </div>

                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <motion.div
                        key={exp._id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 border-l-2 border-primary/30"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"
                          style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)' }}
                        />
                        <h4 className="font-heading text-lg text-foreground mb-1">{exp.jobTitle}</h4>
                        <p className="font-heading text-sm text-primary mb-2">{exp.companyName}</p>
                        <p className="font-heading text-xs text-foreground/60 mb-2">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          {' - '}
                          {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                          {exp.location && ` | ${exp.location}`}
                        </p>
                        {exp.description && (
                          <p className="font-heading text-sm text-foreground/80">{exp.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-background/40 backdrop-blur-md border border-accent-purple/30 rounded-lg p-8"
                  style={{ boxShadow: '0 0 30px rgba(138, 43, 226, 0.15)' }}
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-accent-purple/20">
                    <GraduationCap className="w-6 h-6 text-accent-purple" />
                    <h3 className="font-heading text-2xl text-accent-purple">EDUCATION</h3>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu._id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 border-l-2 border-accent-purple/30"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent-purple"
                          style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)' }}
                        />
                        <h4 className="font-heading text-lg text-foreground mb-1">{edu.degreeName}</h4>
                        <p className="font-heading text-sm text-accent-purple mb-2">{edu.institution}</p>
                        <p className="font-heading text-xs text-foreground/60 mb-2">
                          {edu.startYear} - {edu.endYear}
                          {edu.location && ` | ${edu.location}`}
                        </p>
                        {edu.description && (
                          <p className="font-heading text-sm text-foreground/80">{edu.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
