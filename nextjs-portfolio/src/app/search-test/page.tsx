"use client";

import { useState } from 'react';
import { projects, skills, experience } from '@/lib/data';

export default function SearchTestPage() {
  const [searchTerm, setSearchTerm] = useState('ucrd');

  const projectResults = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const skillResults = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const experienceResults = experience.filter(exp =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.description.some(desc => desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
    exp.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Test Page</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Search Term:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
            placeholder="Enter search term..."
          />
        </div>

        <div className="grid gap-6">
          {/* Projects */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              Projects ({projectResults.length})
            </h2>
            {projectResults.length > 0 ? (
              <div className="space-y-3">
                {projectResults.map((project) => (
                  <div key={project.id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                    <h3 className="font-medium text-white">{project.title}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No projects found</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              Skills ({skillResults.length})
            </h2>
            {skillResults.length > 0 ? (
              <div className="space-y-3">
                {skillResults.map((skill) => (
                  <div key={skill.name} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <p className="text-zinc-400 text-sm capitalize">{skill.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{skill.proficiency}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No skills found</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Experience ({experienceResults.length})
            </h2>
            {experienceResults.length > 0 ? (
              <div className="space-y-3">
                {experienceResults.map((exp) => (
                  <div key={exp.id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                    <h3 className="font-medium text-white">{exp.title}</h3>
                    <p className="text-zinc-400 text-sm">{exp.company}</p>
                    <p className="text-zinc-500 text-xs">
                      {exp.startDate} - {exp.endDate} • {exp.location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No experience found</p>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
          <h3 className="font-medium text-white mb-2">Search Instructions:</h3>
          <ul className="text-zinc-400 text-sm space-y-1">
            <li>• Try searching for "ucrd" to find the UCRD Management System</li>
            <li>• Try searching for "react" to find React-related projects and skills</li>
            <li>• Try searching for "php" to find PHP-related projects</li>
            <li>• Use Ctrl+K (or Cmd+K) to open search in the header</li>
            <li>• Press Escape to close search results</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 