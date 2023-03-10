import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer({ audioId }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [playState, setPlayState] = useState(false);
  const [iconUrl, setIconUrl] = useState('/images/your-audio-icon.png');
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (audioRef.current) {
      if (playState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playState]);

  const handleAudioClick = () => {
    if (playState) {
      setPlayState(false);
      setIconUrl('/images/your-audio-icon.png');
    } else {
      setPlayState(true);
      setIconUrl('/images/your-pause-icon.png');
    }
  }

  return (
    <div onClick={handleAudioClick}>
      <img src={iconUrl} alt="Audio Icon" style={{ width: '30px', height: '30px' }} />
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}

export default AudioPlayer;
