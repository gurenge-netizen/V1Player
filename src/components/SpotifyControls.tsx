import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  url: string;
  genre: string;
}

const playlist: Song[] = [
  {
    title: "Gurenge",
    artist: "LiSA",
    url: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3",
    genre: "J-Pop"
  },
  {
    title: "Homura",
    artist: "LiSA",
    url: "https://assets.codepen.io/4358584/Anitek_-_Tides.mp3",
    genre: "J-Pop"
  },
  {
    title: "Zankyou Sanka",
    artist: "Aimer",
    url: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3",
    genre: "J-Pop"
  },
  {
    title: "Akuma no Ko",
    artist: "Ai Higuchi",
    url: "https://assets.codepen.io/4358584/Anitek_-_Tides.mp3",
    genre: "J-Pop"
  },
  {
    title: "The Rumbling",
    artist: "SiM",
    url: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3",
    genre: "Rock"
  }
];

const SpotifyControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playHistory, setPlayHistory] = useState<number[]>([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRandomSongIndex = (currentIndex: number) => {
    const currentGenre = playlist[currentIndex].genre;
    const sameGenreSongs = playlist
      .map((song, index) => ({ index, genre: song.genre }))
      .filter(song => song.genre === currentGenre && song.index !== currentIndex);
    
    if (sameGenreSongs.length === 0) return (currentIndex + 1) % playlist.length;
    return sameGenreSongs[Math.floor(Math.random() * sameGenreSongs.length)].index;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(audioRef.current.currentTime));
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const percentage = (clickPosition / progressBarWidth) * 100;
      const newTime = (percentage / 100) * audioRef.current.duration;
      
      audioRef.current.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newVolume = Math.round((clickPosition / rect.width) * 100);
    
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSkipForward = () => {
    const nextIndex = getRandomSongIndex(currentSongIndex);
    setCurrentSongIndex(nextIndex);
    
    // Update history
    const newHistory = playHistory.slice(0, historyIndex + 1);
    newHistory.push(nextIndex);
    setPlayHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleSkipBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCurrentSongIndex(playHistory[historyIndex - 1]);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 z-10">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSkipForward}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Track Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentSong.title}
        className="text-center"
      >
        <h3 className="text-white/90 text-sm font-medium">{currentSong.title}</h3>
        <p className="text-white/60 text-xs">{currentSong.artist}</p>
        <p className="text-white/40 text-xs">{currentSong.genre}</p>
      </motion.div>

      {/* Main Controls */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={handleSkipBack}
          className="text-white/60 hover:text-white/90 transition-colors"
          disabled={historyIndex === 0}
        >
          <SkipBack size={20} className={historyIndex === 0 ? "opacity-50" : ""} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="text-white" size={24} />
          ) : (
            <Play className="text-white" size={24} />
          )}
        </button>
        <button 
          onClick={handleSkipForward}
          className="text-white/60 hover:text-white/90 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-80 space-y-2">
        <div 
          className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-white/60 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 group">
        <Volume2 size={16} className="text-white/60" />
        <div 
          className="w-24 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
          onClick={handleVolumeChange}
        >
          <div 
            className="h-full bg-white/60 rounded-full transition-all duration-300"
            style={{ width: `${volume}%` }}
          />
        </div>
        <span className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          {volume}%
        </span>
      </div>
    </div>
  );
};

export default SpotifyControls;