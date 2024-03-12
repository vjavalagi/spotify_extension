import React, { useState } from 'react';
import './App.css'; // Make sure to create this CSS file
import SpotifyPlaylistEmbed from './SpotifyPlaylistEmbed';

function App() {
  // Sample state, replace these with actual data fetching logic
  const [playlistInfo, setPlaylistInfo] = useState({
    id: '7JkDxjLUCZyGoQzHjIcOEM', // Example ID, fetch this dynamically
    name: 'My Recommended Playlist',
    description: 'A selection of tracks based on my top listens.'
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Playlist Generator</h1>
      </header>
      <nav className="App-nav">
        {/* {Add header info here if needed} */}
      </nav>
      <main className="App-content">
        <SpotifyPlaylistEmbed
          playlistId={playlistInfo.id}
          playlistName={playlistInfo.name}
          playlistDescription={playlistInfo.description}
        />
      </main>
      <footer className="App-footer">
        <p>Created by Veda ❤️</p>
      </footer>
    </div>
  );
}

export default App;
