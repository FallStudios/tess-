import React from 'react';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    videoUrl?: string;
    imageUrl: string;
    id: string;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handlePurchase = () => {
    const paypalUrl = "https://paypal.me/yourusername"; // Replace with your PayPal link
    window.open(paypalUrl, '_blank');
    alert("After payment, please send the payment certificate to username#0000 on Discord to receive your files.");
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white/10 p-8 rounded-lg max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
        
        <div className="aspect-video mb-4 rounded overflow-hidden bg-black/40">
          {project.videoUrl ? (
            <video
              controls
              className="w-full h-full object-contain"
              playsInline
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <p className="text-gray-300 mb-6">{project.description}</p>

        <button
          onClick={handlePurchase}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
        >
          Buy Item
        </button>
      </div>
    </div>
  );
}