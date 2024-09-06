const axios = require('axios');
const { LASTFM_API_KEY } = require('../config');

// Fetches artist info
async function getArtistInfo(artistName) {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'artist.getinfo',
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: 'json',
      },
    });
    console.log('Artist info fetched:', response.data); // Log the response to check the structure
    return response.data;
  } catch (error) {
    console.error('Last.fm API error (artist info):', error.message);
    throw new Error(`API Error: ${error.response ? error.response.data.message : error.message}`);
  }
}

// Fetches artist's top tracks (renamed function)
async function getTopTracks(artistName) {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'artist.gettoptracks',
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: 'json',
      },
    });
    console.log('Artist top tracks fetched:', response.data); // Log the response
    return response.data.toptracks; // Ensure we're returning the correct data
  } catch (error) {
    console.error('Last.fm API error (top tracks):', error.message);
    throw new Error(`API Error: ${error.response ? error.response.data.message : error.message}`);
  }
}

// Fetches artist's top albums
async function getTopAlbums(artistName) {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'artist.gettopalbums',
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: 'json',
      },
    });
    console.log('Artist top albums fetched:', response.data); // Log the response
    return response.data.topalbums; // Ensure we're returning the correct data
  } catch (error) {
    console.error('Last.fm API error (top albums):', error.message);
    throw new Error(`API Error: ${error.response ? error.response.data.message : error.message}`);
  }
}

// Export all functions
module.exports = { getArtistInfo, getTopTracks, getTopAlbums };