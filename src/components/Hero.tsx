import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 blur-sm"
        >
          <source src="/videos/demo-reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text" style={{
          WebkitTextStroke: '1.5px white'
        }}>
          Crafting Amazing Roblox Experiences
        </h1>
      </div>
    </section>
  );
}