const axios = require('axios');

const SETLISTFM_API_KEY = 'nTRvmN2vHpAFKM0ohcCeczbJNqsqyJapOpA1';
const SETLISTFM_BASE_URL = 'https://api.setlist.fm/rest/1.0/';

async function getArtistEvents(artistName) {
  try {
    const response = await axios.get(`${SETLISTFM_BASE_URL}search/setlists`, {
      params: { artistName },
      headers: {
        'x-api-key': SETLISTFM_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (response.data.setlist && response.data.setlist.length > 0) {
      console.log('Artist events fetched from Setlist.fm:', response.data.setlist);
      return response.data.setlist.map(event => ({
        id: event.id,
        eventDate: event.eventDate,
        venueName: event.venue.name,
        city: event.venue.city.name,
        country: event.venue.city.country.name,
        url: event.url,
      }));
    } else {
      console.log('No events found for artist:', artistName);
      return [];
    }
  } catch (error) {
    console.error('Setlist.fm API error:', error.message);
    throw new Error(`Setlist.fm API Error: ${error.response ? error.response.data.error : error.message}`);
  }
}

module.exports = { getArtistEvents };