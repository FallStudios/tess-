import React from 'react';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  clicks?: number;
}

interface ProjectSectionProps {
  title: string;
  description: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function ProjectSection({ title, description, projects, onProjectClick }: ProjectSectionProps) {
  // Sort projects by clicks (if available)
  const sortedProjects = [...projects].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  const topProjects = sortedProjects.slice(0, 3);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProjects.map((project, index) => (
            <div
              key={index}
              className="bg-black border border-white/20 rounded-xl overflow-hidden hover:border-white/40 transition cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}