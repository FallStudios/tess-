import React from 'react';
import { Code2, Boxes, Layout, PlayCircle, Cog } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">RobloxDev</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#animations" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <PlayCircle className="w-5 h-5" />
              <span>Animations</span>
            </a>
            <a href="#ui" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <Layout className="w-5 h-5" />
              <span>UI Design</span>
            </a>
            <a href="#builds" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <Boxes className="w-5 h-5" />
              <span>Builds</span>
            </a>
            <a href="#systems" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <Cog className="w-5 h-5" />
              <span>Systems</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}