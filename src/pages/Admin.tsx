import React, { useState, useEffect } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string;
}

const initialFormData: FormData = {
  category: 'animations',
  title: '',
  description: '',
  imageUrl: '',
  videoUrl: '',
  tags: ''
};

const mediaOptions = {
  images: [
    { label: 'Combat Demo', value: '/images/combat.jpg' },
    { label: 'Emotes Demo', value: '/images/emotes.jpg' },
    { label: 'Vehicles Demo', value: '/images/vehicles.jpg' },
    { label: 'Menu Demo', value: '/images/menu.jpg' },
    { label: 'Inventory Demo', value: '/images/inventory.jpg' },
    { label: 'HUD Demo', value: '/images/hud.jpg' }
  ],
  videos: [
    { label: 'Combat Demo', value: '/videos/combat.mp4' },
    { label: 'Emotes Demo', value: '/videos/emotes.mp4' },
    { label: 'Vehicles Demo', value: '/videos/vehicles.mp4' },
    { label: 'Menu Demo', value: '/videos/menu.mp4' },
    { label: 'Inventory Demo', value: '/videos/inventory.mp4' },
    { label: 'HUD Demo', value: '/videos/hud.mp4' }
  ]
};

export default function Admin() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>('');
  const [showImageDropdown, setShowImageDropdown] = useState(false);
  const [showVideoDropdown, setShowVideoDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('animations');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { projects, addProject, deleteProject } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'fcisthebest') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.imageUrl || !formData.tags) {
      setError('Please fill in all required fields');
      return;
    }

    const newProject = {
      id: `${formData.category}-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      videoUrl: formData.videoUrl,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      clicks: 0
    };

    addProject(formData.category, newProject);
    setFormData(initialFormData);
    setError('Project added successfully!');
  };

  const handleDeleteProject = (category: string, projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(category, projectId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-lg w-full max-w-md">
          <h2 className="text-white text-2xl mb-6 text-center">Admin Login</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 rounded bg-white/20 text-white mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* Project Management Section */}
        <div className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-white text-xl mb-4">Manage Projects</h2>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Select Category</label>
            <select
              className="w-full p-2 rounded bg-white/20 text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="animations">Animations</option>
              <option value="ui">UI Design</option>
              <option value="builds">Builds</option>
              <option value="systems">Systems</option>
            </select>
          </div>

          <div className="space-y-4">
            {projects[selectedCategory as keyof typeof projects].map((project) => (
              <div key={project.id} className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description.substring(0, 100)}...</p>
                </div>
                <button
                  onClick={() => handleDeleteProject(selectedCategory, project.id)}
                  className="text-red-500 hover:text-red-400 transition p-2"
                  title="Delete Project"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Project Form */}
        <form onSubmit={handleAddProject} className="bg-white/10 p-8 rounded-lg">
          <h2 className="text-white text-xl mb-4">Add New Project</h2>
          
          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-white mb-2">Category</label>
            <select
              className="w-full p-2 rounded bg-white/20 text-white"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="animations">Animations</option>
              <option value="ui">UI Design</option>
              <option value="builds">Builds</option>
              <option value="systems">Systems</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white/20 text-white"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Description</label>
            <textarea
              className="w-full p-2 rounded bg-white/20 text-white"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-white mb-2">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded bg-white/20 text-white"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
              <button
                type="button"
                className="px-3 py-2 bg-white/20 rounded flex items-center gap-1 text-white hover:bg-white/30 transition"
                onClick={() => {
                  setShowImageDropdown(!showImageDropdown);
                  setShowVideoDropdown(false);
                }}
              >
                Select <ChevronDown size={16} />
              </button>
            </div>
            {showImageDropdown && (
              <div className="absolute z-50 mt-1 w-full bg-black rounded-lg overflow-hidden border border-white/20 shadow-xl">
                {mediaOptions.images.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full p-2 text-left text-white hover:bg-white/20 transition"
                    onClick={() => {
                      setFormData({...formData, imageUrl: option.value});
                      setShowImageDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-white mb-2">Video URL (optional)</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded bg-white/20 text-white"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
              />
              <button
                type="button"
                className="px-3 py-2 bg-white/20 rounded flex items-center gap-1 text-white hover:bg-white/30 transition"
                onClick={() => {
                  setShowVideoDropdown(!showVideoDropdown);
                  setShowImageDropdown(false);
                }}
              >
                Select <ChevronDown size={16} />
              </button>
            </div>
            {showVideoDropdown && (
              <div className="absolute z-50 mt-1 w-full bg-black rounded-lg overflow-hidden border border-white/20 shadow-xl">
                {mediaOptions.videos.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full p-2 text-left text-white hover:bg-white/20 transition"
                    onClick={() => {
                      setFormData({...formData, videoUrl: option.value});
                      setShowVideoDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white/20 text-white"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g., Combat, Animation, Action"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}