import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimeGrid = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-[#1a1b2e]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Popular Categories</h2>
        
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                    <p className="text-gray-300 text-sm">{category.count} series</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const categories = [
  {
    id: 1,
    name: "Action",
    count: 245,
    image: "https://images.unsplash.com/photo-1612686635542-2244ed9f8ddc?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Romance",
    count: 189,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Fantasy",
    count: 210,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Slice of Life",
    count: 156,
    image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&q=80"
  }
];

export default AnimeGrid;