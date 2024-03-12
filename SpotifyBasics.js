// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization



// Function to fetch data from the Spotify Web API.
async function fetchWebApi(endpoint, method, body = null) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    return await res.json();
  }
  
  // Main function to perform all operations.
  async function main() {
    // Fetch top tracks.
    async function getTopTracks() {
      return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')).items;
    }
  
    const topTracks = await getTopTracks();
    console.log(
      topTracks?.map(
        ({ name, artists }) => `${name} by ${artists.map(artist => artist.name).join(', ')}`
      )
    );
  
    // Assuming topTracksIds comes from the IDs of the topTracks.
    const topTracksIds = topTracks.map(track => track.id);
  
    // Fetch recommendations based on top tracks.
    async function getRecommendations() {
      return (await fetchWebApi(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET')).tracks;
    }
  
    const recommendedTracks = await getRecommendations();
    console.log(
      recommendedTracks.map(
        ({ name, artists }) => `${name} by ${artists.map(artist => artist.name).join(', ')}`
      )
    );
  
    // Create a playlist with the recommended tracks.
    const tracksUri = recommendedTracks.map(track => `spotify:track:${track.id}`);
  
    async function createPlaylist(tracksUri) {
      const { id: user_id } = await fetchWebApi('v1/me', 'GET');
  
      const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, 'POST', {
        name: "My recommendation playlist",
        description: "Playlist created by the tutorial on developer.spotify.com",
        public: false,
      });
  
      await fetchWebApi(`v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`, 'POST');
  
      return playlist;
    }
  
    const createdPlaylist = await createPlaylist(tracksUri);
    console.log(createdPlaylist.name, createdPlaylist.id);
    console.log(`Link to playlist: https://open.spotify.com/playlist/${createdPlaylist.id}`);

  
    // The embed part can't be executed in Node.js as it's meant for HTML. 
    // Use the playlist ID in your web app or website to embed the playlist.
  }
  
  // Execute the main function.
  main().catch(console.error);