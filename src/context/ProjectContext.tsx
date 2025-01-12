import React, { createContext, useContext, useState, useEffect } from 'react';
import { animationProjects, uiProjects, buildProjects } from '../data/projects';
import { systemProjects } from '../data/systems';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  clicks: number;
}

interface ProjectContextType {
  projects: {
    animations: Project[];
    ui: Project[];
    builds: Project[];
    systems: Project[];
  };
  addProject: (category: string, project: Project) => void;
  deleteProject: (category: string, projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Helper function to generate unique IDs
function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}

// Load initial data from localStorage or use default data
function getInitialData() {
  const savedData = localStorage.getItem('projectData');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return {
    animations: animationProjects.map(p => ({ ...p, id: generateId('anim') })),
    ui: uiProjects.map(p => ({ ...p, id: generateId('ui') })),
    builds: buildProjects.map(p => ({ ...p, id: generateId('build') })),
    systems: systemProjects.map(p => ({ ...p, id: generateId('sys') })),
  };
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState(getInitialData());

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('projectData', JSON.stringify(projects));
  }, [projects]);

  const addProject = (category: string, project: Project) => {
    setProjects(prev => ({
      ...prev,
      [category]: [...prev[category as keyof typeof prev], project],
    }));
  };

  const deleteProject = (category: string, projectId: string) => {
    setProjects(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].filter(p => p.id !== projectId),
    }));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}