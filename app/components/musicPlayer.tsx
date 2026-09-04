'use client';

import { useState, useRef } from 'react';

const tracks = [
  { id: 1, title: 'Project_18', src: '/audio/Project_18v1.mp3' },
  { id: 2, title: 'Project_30', src: '/audio/Project_30v2.mp3' },
  { id: 3, title: 'Project_31', src: '/audio/Project_31v1.mp3' },
  { id: 4, title: 'Project_48', src: '/audio/Project_48v1.mp3' },
  { id: 5, title: 'Project_53', src: '/audio/Project_53v1.mp3' },
  { id: 6, title: 'Brag about these things', src: '/audio/brag_about_these_things_demo.mp3' },
  { id: 7, title: 'Time of day', src: '/audio/time_of_day_demo.mp3' },
];

export default function CustomMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
	// Shows errors if not initialized as null
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentIndex];

  // Play/Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Change track/auto-play
  const changeTrack = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 50);
  };

  const nextTrack = () => {
    const nextIdx = (currentIndex + 1) % tracks.length;
    changeTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentIndex - 1 + tracks.length) % tracks.length;
    changeTrack(prevIdx);
  };

  // Scrubber update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle manual scrubbing
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Load duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Format seconds into mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-xl text-neutral-800 dark:text-neutral-200 select-none">
			
			{/* Hidden native audio element */}
			<audio 
				ref={audioRef}
				src={currentTrack.src}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={nextTrack}
				className="hidden"
			/>

			<div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 text-sm font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
				Audio Showcase
			</div>

			{/* Track List */}
			<div className="max-h-40 overflow-y-auto divide-y divide-neutral-200 dark:divide-neutral-800/50
			[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-300
			dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-transparent">
				{tracks.map((track, idx) => {
					const isSelected = currentIndex === idx;
					return (
						<button
							key={track.id}
							onClick={() => changeTrack(idx)}
							className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
								isSelected 
									? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium' 
									: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200'
							}`}
						>
							<span className="truncate">{track.title}</span>
							{isSelected && isPlaying && <span className="text-xs font-mono text-amber-600 dark:text-yellow-300 animate-pulse">Playing</span>}
						</button>
					);
				})}
			</div>

			{/* Controller */}
			<div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
				<div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
					Now Playing: <span className="text-neutral-900 dark:text-white font-medium">{currentTrack.title}</span>
				</div>

				{/* Scrubber */}
				<div className="flex flex-col gap-1">
					<input 
						type="range"
						min={0}
						max={duration || 0}
						value={currentTime}
						onChange={handleSeek}
						className="w-full h-1 bg-amber-500/40 dark:bg-yellow-500/50 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
					/>
					<div className="flex justify-between text-[10px] font-mono text-neutral-500">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				{/* Playback Controls */}
				<div className="flex items-center justify-center gap-6 pt-1">
					<button 
						onClick={prevTrack}
						className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
						aria-label="Previous Track"
					>
						{/* Prev Icon */}
						<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
					</button>

					<button 
						onClick={togglePlay}
						className="p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-md"
						aria-label={isPlaying ? "Pause" : "Play"}
					>
						{isPlaying ? (
							/* Pause Icon */
							<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
						) : (
							/* Play Icon */
							<svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
						)}
					</button>

					<button 
						onClick={nextTrack}
						className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
						aria-label="Next Track"
					>
						{/* Next Icon */}
						<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
					</button>
				</div>
			</div>

		</div>
  );
}