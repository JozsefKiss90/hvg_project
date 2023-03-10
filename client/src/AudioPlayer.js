import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer({ audioId }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [playState, setPlayState] = useState(false);
  const [iconUrl, setIconUrl] = useState('/audio.png');
  const audioRef = useRef(null);

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
      setIconUrl('/audio.png');
    } else {
      setPlayState(true);
      setIconUrl('/pause.png');
    }
  }

  const handleRestartClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setPlayState(false);
      setIconUrl('/audio.png');
    }
  }

  const containerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const imageStyle = {
    maxWidth: '100%'
  };

  const playerStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0
  };

  return (
    <div style={containerStyle}>
        <img src="/war.jpg" alt="Your Image" style={imageStyle} />
        <div style={playerStyle}>
            <img src={iconUrl} alt="Audio Icon" style={{ width: '35px', height: '35px', padding: '5px' }} onClick={handleAudioClick} />
            <img src="/stop.png" alt="Stop Icon" style={{ width: '35px', height: '35px', padding: '5px'  }} onClick={handleRestartClick} />
            <audio ref={audioRef} src={audioUrl} />
        </div>
    </div>
  );
}

export default AudioPlayer;
