import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectSection from '../components/ProjectSection';
import ProjectModal from '../components/ProjectModal';
import Footer from '../components/Footer';
import { useProjects } from '../context/ProjectContext';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      
      <div id="animations">
        <ProjectSection
          title="Animations"
          description="Bringing characters and objects to life with smooth, professional animations."
          projects={projects.animations}
          onProjectClick={setSelectedProject}
        />
        <div className="text-center pb-8">
          <button 
            onClick={() => navigate('/animations')}
            className="text-white hover:text-gray-300 transition"
          >
            See More Animations
          </button>
        </div>
      </div>
      
      <div id="ui">
        <ProjectSection
          title="UI Design"
          description="Creating intuitive and visually appealing user interfaces for enhanced gameplay experience."
          projects={projects.ui}
          onProjectClick={setSelectedProject}
        />
        <div className="text-center pb-8">
          <button 
            onClick={() => navigate('/ui')}
            className="text-white hover:text-gray-300 transition"
          >
            See More UI Designs
          </button>
        </div>
      </div>
      
      <div id="builds">
        <ProjectSection
          title="Builds"
          description="Crafting immersive environments and detailed structures for unique gaming experiences."
          projects={projects.builds}
          onProjectClick={setSelectedProject}
        />
        <div className="text-center pb-8">
          <button 
            onClick={() => navigate('/builds')}
            className="text-white hover:text-gray-300 transition"
          >
            See More Builds
          </button>
        </div>
      </div>

      <div id="systems">
        <ProjectSection
          title="Systems"
          description="Developing complex game mechanics and frameworks that power engaging gameplay experiences."
          projects={projects.systems}
          onProjectClick={setSelectedProject}
        />
        <div className="text-center pb-8">
          <button 
            onClick={() => navigate('/systems')}
            className="text-white hover:text-gray-300 transition"
          >
            See More Systems
          </button>
        </div>
      </div>

      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}