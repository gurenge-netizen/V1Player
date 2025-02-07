import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#1a1b2e] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80")'
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Discover Anime
            </span>
            <br />
            <span className="text-white">With Perfect Soundtracks</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Immerse yourself in the world of anime with curated playlists and trending shows.
            Experience the perfect blend of visuals and music.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center mx-auto space-x-2 hover:opacity-90 transition-opacity"
          >
            <Play className="h-5 w-5" />
            <span>Start Watching</span>
          </motion.button>
        </motion.div>

        {/* Trending Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingAnime.map((anime, index) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold">{anime.title}</h3>
                      <p className="text-gray-300 text-sm">{anime.genre}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const trendingAnime = [
  {
    id: 1,
    title: "Demon Slayer",
    genre: "Action, Fantasy",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Attack on Titan",
    genre: "Action, Drama",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    genre: "Action, Supernatural",
    image: "https://images.unsplash.com/photo-1612686635542-2244ed9f8ddc?auto=format&fit=crop&q=80"
  }
];

export default Hero;