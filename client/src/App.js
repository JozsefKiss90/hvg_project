import './App.css';
import AudioPlayer from './AudioPlayer'
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function App() {

  const [postContents, setPostContents] = useState('');
  const [audios, setAudios] = useState();
 
  const apiAudioEndpoint = process.env.REACT_APP_NODE_ENV == 'production' ? 'https://hvg-app.herokuapp.com/api/audio' : 'http://localhost:5000/api/audio';
  const apiPostEndpoint = process.env.REACT_APP_NODE_ENV == 'production' ? 'https://hvg-app.herokuapp.com/api/posts' : 'http://localhost:5000/api/posts';
  console.log(apiPostEndpoint)
  
  useEffect(() => { 
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPostContents(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/api/audio')
      .then(response => response.json())
      .then(data => setAudios(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <div>
      <Navbar/>
      <main>
          {
            (postContents.length && audios!=undefined) ? 
              postContents.map((post, i) => {
              return <article>
                  <Link to="/post2" state={{ content : post.text }}>
                    <h2>Ukrainian War: Latest Updates</h2>
                  </Link>  
                  <AudioPlayer audioId={audios[i]._id}/>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vitae dolores sint vel nam. Amet dolor similique, repudiandae fugit aperiam alias consectetur eligendi aliquid quasi dignissimos sit, sunt nesciunt nostrum?</p>
                </article>
              })
             : 'loading'
          } 
      </main>
      <footer>
        <p>&copy; 2023 CBB News</p>
      </footer>
    </div>
  );
}

export default App;
