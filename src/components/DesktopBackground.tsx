import React from 'react';

const DesktopBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=2070&h=1200")',
          filter: 'brightness(0.4) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default DesktopBackground;