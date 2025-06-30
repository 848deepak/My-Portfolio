"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills, experience, education, personalInfo, contactInfo, socialLinks } from '@/lib/data';
import { Project, Skill, Experience } from '@/types';
import { Search, X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResultsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchResults({ query, isOpen, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<{
    projects: Project[];
    skills: Skill[];
    experience: Experience[];
    education: boolean;
    about: boolean;
    personal: boolean;
    contact: boolean;
    socials: { name: string; url: string; icon: string }[];
  }>({ projects: [], skills: [], experience: [], education: false, about: false, personal: false, contact: false, socials: [] });
  
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ projects: [], skills: [], experience: [], education: false, about: false, personal: false, contact: false, socials: [] });
      return;
    }

    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
    const queryWords = normalize(query).split(' ');
    
    // Search in projects
    const projectResults = projects.filter(project =>
      project.title.toLowerCase().includes(normalize(query)) ||
      project.description.toLowerCase().includes(normalize(query)) ||
      project.technologies.some(tech => tech.toLowerCase().includes(normalize(query)))
    );

    // Search in skills
    const skillResults = skills.filter(skill =>
      skill.name.toLowerCase().includes(normalize(query)) ||
      skill.category.toLowerCase().includes(normalize(query))
    );

    // Search in experience
    const experienceResults = experience.filter(exp =>
      exp.title.toLowerCase().includes(normalize(query)) ||
      exp.company.toLowerCase().includes(normalize(query)) ||
      exp.description.some(desc => desc.toLowerCase().includes(normalize(query))) ||
      exp.technologies.some(tech => tech.toLowerCase().includes(normalize(query)))
    );

    // Education search
    const educationFields = [
      education.degree,
      education.institution,
      education.location,
      education.description,
      education.startDate,
      education.endDate
    ];
    const educationMatch = educationFields.some(field => {
      const normField = normalize(field || '');
      return normField.includes(normalize(query)) || normalize(query).includes(normField) || queryWords.some(word => normField.includes(word));
    }) || ['education', 'degree', 'university', 'college'].some(keyword => normalize(query).includes(keyword));

    // About search (bio text)
    const aboutTexts = [
      "I'm passionate about creating innovative solutions and learning new technologies.",
      "My goal is to build applications that make a positive impact on people's lives while continuously improving my skills and knowledge.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community."
    ];
    const aboutMatch = aboutTexts.some(text => {
      const normText = normalize(text);
      return normText.includes(normalize(query)) || normalize(query).includes(normText) || queryWords.some(word => normText.includes(word));
    }) || ['about', 'bio', 'who i am'].some(keyword => normalize(query).includes(keyword));

    // Personal info search
    const personalFields = [personalInfo.name, personalInfo.title, personalInfo.subtitle, personalInfo.institution, personalInfo.location, "Available for opportunities", "2+ years"];
    const personalMatch = personalFields.some(field => {
      const normField = normalize(field || '');
      return normField.includes(normalize(query)) || normalize(query).includes(normField) || queryWords.some(word => normField.includes(word));
    }) || ['personal', 'info', 'name', 'location', 'status', 'experience'].some(keyword => normalize(query).includes(keyword));

    // Contact info search
    const contactFields = [contactInfo.email, contactInfo.phone, contactInfo.location, contactInfo.github, contactInfo.linkedin, contactInfo.twitter];
    const contactMatch = contactFields.some(field => {
      const normField = normalize(field || '');
      return normField.includes(normalize(query)) || normalize(query).includes(normField) || queryWords.some(word => normField.includes(word));
    }) || ['contact', 'email', 'phone'].some(keyword => normalize(query).includes(keyword));

    // Social links search
    const matchedSocials = socialLinks.filter(link => link.name.toLowerCase().includes(normalize(query)) || link.url.toLowerCase().includes(normalize(query)));

    setResults({
      projects: projectResults,
      skills: skillResults,
      experience: experienceResults,
      education: educationMatch,
      about: aboutMatch,
      personal: personalMatch,
      contact: contactMatch,
      socials: matchedSocials,
    });
  }, [query]);

  const totalResults = results.projects.length + results.skills.length + results.experience.length;

  const handleProjectClick = (project: Project) => {
    onClose();
    router.push('/projects');
  };

  const handleSkillClick = (skill: Skill) => {
    onClose();
    router.push('/skills');
  };

  const handleExperienceClick = (exp: Experience) => {
    onClose();
    router.push('/experience');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed left-0 right-0 top-20 z-[999] bg-black/50 backdrop-blur-sm pointer-events-none"
        style={{ height: 'calc(100vh - 5rem)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-4 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-h-[70vh] overflow-hidden pointer-events-auto mt-24"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-700">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-zinc-400" />
              <span className="text-white font-medium">
                Search Results for "{query}"
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-zinc-500">Click items to navigate</span>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
            {totalResults === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-zinc-300 mb-2">No results found</h3>
                <p className="text-zinc-500">Try searching for different keywords</p>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {/* Projects */}
                {results.projects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Projects ({results.projects.length})
                    </h3>
                    <div className="grid gap-3">
                      {results.projects.map((project) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-750 transition-all duration-200 cursor-pointer group"
                          onClick={() => handleProjectClick(project)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                  {project.title}
                                </h4>
                                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                              </div>
                              <p className="text-zinc-400 text-sm mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github className="w-4 h-4 text-zinc-300" />
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="w-4 h-4 text-zinc-300" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {results.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Skills ({results.skills.length})
                    </h3>
                    <div className="grid gap-3">
                      {results.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-750 transition-all duration-200 cursor-pointer group"
                          onClick={() => handleSkillClick(skill)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">
                                {skill.name}
                              </h4>
                              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-green-400 transition-colors" />
                            </div>
                            <div className="text-right">
                              <div className="text-white font-medium">{skill.proficiency}%</div>
                              <div className="w-20 h-2 bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-zinc-400 text-sm capitalize mt-1">{skill.category}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {results.experience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Experience ({results.experience.length})
                    </h3>
                    <div className="grid gap-3">
                      {results.experience.map((exp) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-750 transition-all duration-200 cursor-pointer group"
                          onClick={() => handleExperienceClick(exp)}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                  {exp.title}
                                </h4>
                                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                              </div>
                              <p className="text-zinc-400 text-sm">{exp.company}</p>
                              <p className="text-zinc-500 text-xs">
                                {exp.startDate} - {exp.endDate} • {exp.location}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {results.education && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Education
                    </h3>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                      <div className="text-white font-medium text-base">{education.degree}</div>
                      <div className="text-zinc-400 text-sm">{education.institution}</div>
                      <div className="text-zinc-500 text-xs">{education.startDate} - {education.endDate} • {education.location}</div>
                      <div className="text-zinc-400 text-sm mt-1">{education.description}</div>
                    </div>
                  </div>
                )}

                {/* About */}
                {results.about && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                      About
                    </h3>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-zinc-300">
                      <div className="mb-2">I'm passionate about creating innovative solutions and learning new technologies.</div>
                      <div className="mb-2">My goal is to build applications that make a positive impact on people's lives while continuously improving my skills and knowledge.</div>
                      <div>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.</div>
                    </div>
                  </div>
                )}

                {/* Personal Info */}
                {results.personal && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Personal Info
                    </h3>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-zinc-300">
                      <div><span className="font-medium text-white">Name:</span> {personalInfo.name}</div>
                      <div><span className="font-medium text-white">Title:</span> {personalInfo.title}</div>
                      <div><span className="font-medium text-white">Subtitle:</span> {personalInfo.subtitle}</div>
                      <div><span className="font-medium text-white">Institution:</span> {personalInfo.institution}</div>
                      <div><span className="font-medium text-white">Location:</span> {personalInfo.location}</div>
                      <div><span className="font-medium text-white">Status:</span> Available for opportunities</div>
                      <div><span className="font-medium text-white">Experience:</span> 2+ years</div>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {results.contact && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                      Contact Info
                    </h3>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-zinc-300">
                      <div><span className="font-medium text-white">Email:</span> <a href={`mailto:${contactInfo.email}`} className="underline text-blue-400">{contactInfo.email}</a></div>
                      <div><span className="font-medium text-white">Phone:</span> <a href={`tel:${contactInfo.phone}`} className="underline text-blue-400">{contactInfo.phone}</a></div>
                      <div><span className="font-medium text-white">Location:</span> {contactInfo.location}</div>
                      <div><span className="font-medium text-white">GitHub:</span> <a href={contactInfo.github} target="_blank" className="underline text-blue-400">{contactInfo.github}</a></div>
                      <div><span className="font-medium text-white">LinkedIn:</span> <a href={contactInfo.linkedin} target="_blank" className="underline text-blue-400">{contactInfo.linkedin}</a></div>
                      <div><span className="font-medium text-white">Twitter:</span> <a href={contactInfo.twitter} target="_blank" className="underline text-blue-400">{contactInfo.twitter}</a></div>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {results.socials.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                      Social Links
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {results.socials.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-700 transition-colors">
                          <span>{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 