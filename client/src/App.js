import './App.css';
import AudioPlayer from './AudioPlayer'
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import imageUrls from './ImageUrls.json'
function App() {

  const [postContents, setPostContents] = useState('');
  const [audios, setAudios] = useState();
 
  const apiAudioEndpoint = process.env.REACT_APP_NODE_ENV === 'production' ? '/api/audio' : 'http://localhost:5000/api/audio';
  const apiPostEndpoint = process.env.REACT_APP_NODE_ENV === 'production' ? '/api/posts' : 'http://localhost:5000/api/posts';

  
  useEffect(() => { 
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPostContents(data))
      .catch(error => console.error(error));
  }, [apiPostEndpoint]);

  useEffect(() => {
    fetch('/api/audio')
      .then(response => response.json())
      .then(data => setAudios(data))
      .catch(error => console.error(error));
  }, [apiAudioEndpoint]);

  return (
    <div>
      <Navbar/>
      <main>
          {
            (postContents.length && audios!==undefined) ? 
              postContents.map((post, i) => {
              return <article key={i}>
                  <Link to={`/post/${i+1}`} state={{ content : post.text, title: post.name }}>
                    <div>
                      <h2>{post.name}</h2>
                    </div>
                  </Link>
                  <AudioPlayer audioId={audios[i]._id} imgUrl={imageUrls[i]} linkProps={{content : post.text, title: post.name, index: i}}/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vitae dolores sint vel nam. Amet dolor similique, repudiandae fugit aperiam alias consectetur eligendi aliquid quasi dignissimos sit, sunt nesciunt nostrum?</p>
                </article>
              })
             : <div className="spinner"></div>
          } 
      </main>
      <footer>
        <p>&copy; hvg-app.hu</p>
      </footer>
    </div>
  );
}

export default App;
