'use client';

import { useState } from 'react';

const mediaItems = [
  {
    id: 1,
    type: 'image',
    src: 'art/lighthouse_v2.png',
    title: 'Lighthouse Artwork',
    description: 'I really like lighthouses and coastal aesthetics. I drew this back in 2018 using a permanent marker.',
  },
  {
    id: 2,
    type: 'video',
    src: 'art/rainsign.mp4',
    title: 'Rign Sign',
    description: 'A spooky animation created using Blender and photos taken in a hallway. I thought it looked really ominous yet goofy lol.',
  },
  {
    id: 3,
    type: 'video',
    src: 'art/trash.mp4',
    title: 'Trash Can at the Dock',
    description: 'A short animation created using Blender and photos taken at the San Clemente Pier.',
  },
  {
    id: 4,
    type: 'image',
    src: 'art/cat_v2.png',
    title: 'Cat Artwork',
    description: "Part of a short comic series inspired by Schrödinger's cat.",
  },
  {
    id: 5,
    type: 'image',
    src: 'art/toilet_v2.png',
    title: 'Toilet Artwork',
    description: "On da boat in Hawaii lol.",
  },
];

export default function CustomImageViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = mediaItems[currentIndex];

  const nextItem = () => {
    setCurrentIndex((curr) => (curr + 1) % mediaItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((curr) => (curr - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-xl text-neutral-800 dark:text-neutral-200 select-none">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex justify-between items-center">
        <span>Visual Showcase</span>
        <span className="text-xs text-yellow-700 dark:text-yellow-300 font-mono">
          {currentIndex + 1} / {mediaItems.length}
        </span>
      </div>

      {/* Display Area */}
      <div className="relative w-full aspect-4/3 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center overflow-hidden group">
        {currentItem.type === 'video' ? (
          <video 
            src={currentItem.src} 
            controls
            playsInline
            className="w-full h-full object-contain select-none"
          />
        ) : (
          <img 
            src={currentItem.src} 
            alt={currentItem.title} 
            className="w-full h-full object-contain select-none"
          />
        )}

        {/* Prev Arrow */}
        <button 
          onClick={prevItem}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-950/65 text-neutral-800 dark:text-white hover:bg-white dark:hover:bg-neutral-950/90 transition-colors backdrop-blur-sm opacity-70 group-hover:opacity-100 shadow-md"
          aria-label="Previous Media"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        {/* Next Arrow */}
        <button 
          onClick={nextItem}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-950/65 text-neutral-800 dark:text-white hover:bg-white dark:hover:bg-neutral-950/90 transition-colors backdrop-blur-sm opacity-70 group-hover:opacity-100 shadow-md"
          aria-label="Next Media"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>

      {/* Title/Description Section */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{currentItem.title}</h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{currentItem.description}</p>
      </div>

    </div>
  );
}