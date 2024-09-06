const lastfmApi = require('../helpers/lastfmApi');
const spotifyApi = require('../helpers/spotifyApi');
const setlistfmApi = require('../helpers/setlistfmApi'); // Import Setlist.fm helper

async function getArtistData(artistName) {
  try {
    const lastFmData = await lastfmApi.getArtistInfo(artistName);
    const artistTracks = await lastfmApi.getTopTracks(artistName); // Fetch top tracks from Last.fm
    const artistEvents = await setlistfmApi.getArtistEvents(artistName); // Fetch events from Setlist.fm
    const artistAlbums = await lastfmApi.getTopAlbums(artistName);
    const spotifyData = await spotifyApi.searchArtistOnSpotify(artistName);

    const responseData = {
      lastFmData,
      artistTracks, // Include the fetched top tracks
      artistEvents, // Include the fetched events from Setlist.fm
      artistAlbums, // Include the fetched albums
      spotifyData,
    };

    return responseData;
  } catch (err) {
    console.error('Error fetching artist data:', err);
    throw new Error('Failed to fetch artist data');
  }
}

module.exports = {
  getArtistData,
};