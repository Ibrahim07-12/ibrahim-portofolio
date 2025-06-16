"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  className?: string;
}

export function AudioPlayer({ className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/audio/ambient-portfolio.mp3" type="audio/mpeg" />
        <source src="/audio/ambient-portfolio.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Container */}
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Main Toggle Button */}
        <motion.button
          onClick={togglePlay}
          className={`
            w-14 h-14 rounded-full backdrop-blur-md border border-white/20 
            flex items-center justify-center transition-all duration-300 shadow-xl
            ${isPlaying 
              ? 'bg-blue-500/90 text-white shadow-blue-500/40 shadow-2xl' 
              : 'bg-black/70 text-gray-300 hover:text-white hover:bg-black/90'
            }
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isPlaying ? "Pause background music" : "Play background music"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg 
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </motion.svg>
            ) : (
              <motion.svg 
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6 ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Extended Controls - Show on Hover */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-16 top-0 bg-black/90 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl min-w-[280px]"
            >
              {/* Track Info */}
              <div className="mb-3">
                <h4 className="text-white font-medium text-sm mb-1">🎵 Background Music</h4>
                <p className="text-gray-400 text-xs">Ambient Portfolio Theme</p>
              </div>

              {/* Time Progress */}
              {duration > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                {/* Volume Icon */}
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                
                {/* Volume Slider */}
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Volume Percentage */}
                <span className="text-xs text-gray-300 min-w-[35px] text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Music Note Animation */}
              {isPlaying && (
                <div className="absolute -top-2 -right-2">
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-blue-400 text-lg"
                  >
                    🎵
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing Indicator */}
        {isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Custom CSS untuk slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #2563EB;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-webkit-slider-track {
          height: 6px;
          border-radius: 3px;
          background: #374151;
        }
        
        .slider::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: #374151;
        }
      `}</style>
    </div>
  );
}