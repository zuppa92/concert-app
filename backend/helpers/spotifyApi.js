const axios = require('axios');
const querystring = require('querystring');
const config = require('../config');

const client_id = 'dbc3766e068445eb97806e8ca9b8756a';
const client_secret = '8f8fb727bb054a50a89eb01a4849be69';

async function getSpotifyToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token',
    querystring.stringify({ grant_type: 'client_credentials' }), {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  return response.data.access_token;
}

async function searchArtistOnSpotify(artistName) {
  const token = await getSpotifyToken();
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  if (response.data.artists.items.length > 0) {
    return response.data.artists.items[0]; // return the first matching artist
  } else {
    return null;
  }
}

module.exports = {
  searchArtistOnSpotify,
};