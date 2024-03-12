import React from 'react';

function SpotifyPlaylistEmbed({ playlistId, playlistName, playlistDescription }) {
    return (
      <div>
        <h2>{playlistName}</h2>
        <p>{playlistDescription}</p>
        <iframe
          title="Spotify Embed: Recommendation Playlist"
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="380"
          style={{ minHeight: '350px', border: '0', borderRadius: '12px', overflow: 'hidden' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    );
  }
  

export default SpotifyPlaylistEmbed;
