import './App.css';
import AudioPlayer from './AudioPlayer'
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import imageUrls from './ImageUrls.json'
function App() {

  const [postContents, setPostContents] = useState('');
  const [audios, setAudios] = useState();
  
  const apiPostEndpoint = process.env.REACT_APP_NODE_ENV === 'production' ? '/api/posts' : 'http://localhost:5000/api/posts';
  const apiAudioEndpoint = process.env.REACT_APP_NODE_ENV === 'production' ? '/api/audio' : 'http://localhost:5000/api/audio';
  
  useEffect(() => { 
    fetch(apiPostEndpoint)
      .then(response => response.json())
      .then(data => setPostContents(data))
      .catch(error => console.error(error));
  }, [apiPostEndpoint]);

  useEffect(() => {
    fetch(apiAudioEndpoint)
      .then(response => response.json())
      .then(data => setAudios(data))
      .catch(error => console.error(error));
  }, [apiAudioEndpoint]);

  console.log(postContents)

  return (
    <div>
      <Navbar/>
      <main>
          {
            (postContents.length && audios!==undefined) ? 
            <article>
            <Link to={`/post/${1}`} state={{ content : postContents.text, title: postContents.name }}>
              <div>
                <h2>{postContents[0].name}</h2>
              </div>
            </Link>
            <AudioPlayer audioId={audios[0]._id} imgUrl={imageUrls[0]}/>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vitae dolores sint vel nam. Amet dolor similique, repudiandae fugit aperiam alias consectetur eligendi aliquid quasi dignissimos sit, sunt nesciunt nostrum?</p>
          </article>
             : <div className="spinner"></div>
          }
            <div className="container">
       
            {postContents.slice(1).map(post => (
            <Link key={post._id} to={`/post/${post._id}`} state={{ content: post.text, title: post.name }}>
              <h2>{post.name}</h2>
            </Link>
          ))} :
          <div className='spinner'>

          </div>
    
      </div> 
      </main>
    


      <footer>
        <p>&copy; hvg-app.hu</p>
      </footer>
    </div>
  );
}

export default App;