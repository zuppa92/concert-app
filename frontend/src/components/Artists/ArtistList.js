import React, { useState, useEffect } from 'react';
import ConcertApi from '../../services/api';
import '../../styles/ArtistList.css'; // Import the CSS

function ArtistList({ searchTerm }) {
  const [artistData, setArtistData] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [events, setEvents] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [artistImage, setArtistImage] = useState('');
  const [artistBio, setArtistBio] = useState('');

  useEffect(() => {
    // Reset state when component mounts
    setArtistData(null);
    setSpotifyData(null);
    setTracks([]);
    setAlbums([]);
    setEvents([]);
    setSimilarArtists([]);
    setArtistImage('');
    setArtistBio('');

    async function fetchArtistData() {
      if (!searchTerm) return;

      try {
        const data = await ConcertApi.getArtistData(searchTerm);

        if (data.lastFmData && data.lastFmData.artist) {
          const artistInfo = data.lastFmData.artist;
          setArtistData(artistInfo);

          if (artistInfo.image && artistInfo.image.length > 0) {
            const largeImage = artistInfo.image.find(img => img.size === 'extralarge') ||
                               artistInfo.image.find(img => img.size === 'large') ||
                               artistInfo.image.find(img => img.size === 'medium') ||
                               artistInfo.image[0];
            if (largeImage && largeImage['#text']) {
              setArtistImage(largeImage['#text']);
            } else {
              setArtistImage('https://i.redd.it/nblqzhxqb3671.png'); // Placeholder image
            }
          } else {
            setArtistImage('https://i.redd.it/nblqzhxqb3671.png'); // Placeholder image
          }

          if (artistInfo.bio && artistInfo.bio.summary) {
            setArtistBio(artistInfo.bio.summary);
          }

          if (artistInfo.similar) {
            setSimilarArtists(artistInfo.similar.artist);
          }
        }

        if (data.artistTracks && Array.isArray(data.artistTracks.track)) {
          setTracks(data.artistTracks.track.slice(0, 5));
        } else if (Array.isArray(data.artistTracks)) {
          setTracks(data.artistTracks.slice(0, 5));
        }

        if (data.artistAlbums && data.artistAlbums.album && Array.isArray(data.artistAlbums.album)) {
          setAlbums(data.artistAlbums.album.slice(0, 5));
        }

        if (data.spotifyData) {
          setSpotifyData(data.spotifyData);

          if (data.spotifyData.images && data.spotifyData.images.length > 0) {
            setArtistImage(data.spotifyData.images[0].url);
          }
        }

        if (data.artistEvents && Array.isArray(data.artistEvents)) {
          setEvents(data.artistEvents.slice(0, 5));
        }

      } catch (err) {
        console.error('Failed to fetch artist data', err);
      }
    }

    fetchArtistData();
  }, [searchTerm]);

  return (
    <div className="artist-container">
      {artistData ? (
        <>
          <h2 className="artist-title">{artistData.name}</h2>
          {artistImage && (
            <img 
              className="artist-image"
              src={artistImage} 
              alt={`${artistData.name}`} 
              onError={(e) => { e.target.src = 'https://i.redd.it/nblqzhxqb3671.png'; }} 
            />
          )}

          <div className="artist-bio-box artist-box">
            <h3>Biography</h3>
            <p>{artistBio}</p> 
            <p>
              <a className="artist-link" href={artistData.url} target="_blank" rel="noopener noreferrer">
                Visit artist on Last.fm
              </a>
            </p>
          </div>

          {/* Music Information */}
          <div className="music-info-box artist-box">
            <h3>Music Information</h3>
            {spotifyData && (
              <div>
                <h4>Spotify Information</h4>
                <table className="artist-table">
                  <tbody>
                    <tr>
                      <th>Genres</th>
                      <td>{spotifyData.genres.join(', ')}</td>
                    </tr>
                    <tr>
                      <th>Followers</th>
                      <td>{spotifyData.followers.total}</td>
                    </tr>
                  </tbody>
                </table>
                <a className="artist-link" href={spotifyData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Visit artist on Spotify
                </a>
              </div>
            )}

            <div>
              <h4>Top 5 Tracks</h4>
              <table className="artist-table">
                <tbody>
                  {tracks.length > 0 ? (
                    tracks.map(track => (
                      <tr key={track.name}>
                        <td>{track.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No top tracks available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div>
              <h4>Top 5 Albums</h4>
              <table className="artist-table">
                <tbody>
                  {albums.length > 0 ? (
                    albums.map(album => (
                      <tr key={album.name}>
                        <td>{album.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No top albums available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Events Information */}
          <div className="events-info-box artist-box">
            <h3>Recent Events</h3>
            <table className="artist-table">
              <tbody>
                {events.length > 0 ? (
                  events.map(event => (
                    <tr key={event.id}>
                      <td>
                        <a className="artist-link" href={event.url} target="_blank" rel="noopener noreferrer">
                          {event.eventDate} - {event.venueName}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No recent events available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Similar Artists Information */}
          <div className="similar-artists-box artist-box">
            <h3>Similar Artists</h3>
            <table className="artist-table">
              <tbody>
                {similarArtists.length > 0 ? (
                  similarArtists.map(artist => (
                    <tr key={artist.name}>
                      <td>{artist.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No similar artists available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Welcome to the artist page. Please search for an artist to see their information.</p>
      )}
    </div>
  );
}

export default ArtistList;