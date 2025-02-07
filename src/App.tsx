import React from 'react';
import DesktopBackground from './components/DesktopBackground';
import SpotifyControls from './components/SpotifyControls';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <DesktopBackground />
      <SpotifyControls />
    </div>
  );
}

export default App;