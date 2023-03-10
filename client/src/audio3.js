import React, { useState, useEffect } from 'react';

function AudioPlayer({ audioId }) {
  const [audioUrl, setAudioUrl] = useState('');

  // Fetch the audio URL from the backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/audio/${audioId}`)
      .then(response => response.blob())
      .then(blob => {
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      })
      .catch(error => console.error(error));
  }, [audioId]);
  
  
  return (
    <audio controls src={audioUrl}>
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;





