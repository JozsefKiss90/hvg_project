import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function AudioPlayer({ audioId, imgUrl, linkProps }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [playState, setPlayState] = useState(false);
  const [iconUrl, setIconUrl] = useState('/audio.png');
  const audioRef = useRef(null);
  const apiAudioEndpoint = process.env.REACT_APP_NODE_ENV === 'production' ? 'https://hvg-app.herokuapp.com/api/audio/' : 'http://localhost:5000/api/audio/';

  useEffect(() => {
    fetch(`/api/audio/${audioId}`)
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
    height: '430px',
    width: '720px'
  };

  const playerStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0
  };

  return (
    <div style={containerStyle}>
        <Link to={`/post/${linkProps.index}`} state={{ content : linkProps.content, title: linkProps.title }}>
          <img src={imgUrl} alt="bg url" style={imageStyle} />
        </Link>
        <div style={playerStyle}>
            <img src={iconUrl} alt="Audio Icon" className="button-icon" onClick={handleAudioClick} />
            <img src="/stop.png" alt="Stop Icon" className="button-icon" onClick={handleRestartClick} />
            <audio ref={audioRef} src={audioUrl} />
        </div>
    </div>
  );
}

export default AudioPlayer;
