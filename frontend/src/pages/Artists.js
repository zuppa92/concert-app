// src/pages/Artists.js
import React, { useState, useEffect } from 'react';
import ConcertApi from '../services/api';

function Artists() {
  const [artistName, setArtistName] = useState(''); // or set a default artist
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    async function getArtist() {
      try {
        const data = await ConcertApi.getArtistInfo(artistName);
        setArtistInfo(data);
      } catch (error) {
        console.error("Failed to fetch artist info:", error);
      }
    }

    if (artistName) {
      getArtist();
    }
  }, [artistName]);

  return (
    <div>
      <h1>Artist Information</h1>
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Enter artist name"
      />
      {artistInfo && (
        <div>
          <h2>{artistInfo.artist.name}</h2>
          <p>{artistInfo.artist.bio.summary}</p>
          {/* Add more artist details as needed */}
        </div>
      )}
    </div>
  );
}

export default Artists;