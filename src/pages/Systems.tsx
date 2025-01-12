import React, { useState } from 'react';
import ProjectModal from '../components/ProjectModal';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';

export default function Systems() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-white hover:text-gray-300 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6">All Systems</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.systems.map((project, index) => (
          <div
            key={index}
            className="bg-black border border-white/20 rounded-xl overflow-hidden hover:border-white/40 transition cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}