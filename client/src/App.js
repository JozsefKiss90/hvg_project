import './App.css';
import BlogPost from './BlogPost2';
import './App.css';
import TextToSpeech from './TextToSpeech';
import AudioPlayer from './AudioPlayer'
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function App() {

  const [postContents, setPostContents] = useState('');
  const [audios, setAudios] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts`)
      .then(response => response.json())
      .then(data => setPostContents(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/audio`)
      .then(response => response.json())
      .then(data => setAudios(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Navbar/>
      <main>
        <article> 
          <Link to="/post">
            <h2>Ukrainian War: Latest Updates</h2>
          </Link>
          <img src="/war.jpg" alt="" />
          <AudioPlayer audioId={'6403a0d54541a730c423076a'}/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vitae dolores sint vel nam. Amet dolor similique, repudiandae fugit aperiam alias consectetur eligendi aliquid quasi dignissimos sit, sunt nesciunt nostrum?</p>
        </article>
          {
            postContents.length ? 
              postContents.map(post => {
              return  <article>
                        <BlogPost key={post.id} content={post.text}/>
                      </article>
              })
             : 'loading'
          } 
      </main>
      <footer>
        <p>&copy; 2023 BBC News</p>
      </footer>
    </div>
  );
}

export default App;
