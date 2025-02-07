import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Minimize2, Maximize2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed bottom-0 right-0 ${
        isMinimized ? 'w-64' : 'w-96'
      } bg-[#1a1b2e] text-white rounded-tl-xl shadow-lg transition-all duration-300`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Now Playing</h3>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </button>
        </div>

        {!isMinimized && (
          <div className="mb-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
                alt="Album art"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Gurenge</h4>
              <p className="text-sm text-gray-400">LiSA</p>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-1 rounded-full"
              style={{ width: '45%' }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;