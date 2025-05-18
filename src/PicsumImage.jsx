import React, { useState } from 'react';

  function getNewImageUrl() {
    // Add a random query param to force a fresh image (avoid caching)
    return `https://picsum.photos/400?random=${Math.floor(Math.random() * 10000)}`;
  }

function PicsumImage() {
  const [url, setUrl] = useState(getNewImageUrl())


  function refreshImage() {
    setUrl(getNewImageUrl());
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={url}
        alt="Random from Picsum"
        style={{ borderRadius: '8px', cursor: 'pointer' }}
        onClick={refreshImage}
      />
      <p>Click the image to refresh</p>
    </div>
  );
}

export default PicsumImage;
