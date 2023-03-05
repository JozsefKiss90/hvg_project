import './App.css';
import BlogPost from './BlogPost';
import './App.css';
import TextToSpeech from './TextToSpeech';
import AudioPlayer from './AudioPlayer'
import Navbar from './Navbar';
import {Link} from "react-router-dom";

function App() {
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
      </main>
      <footer>
        <p>&copy; 2023 BBC News</p>
      </footer>
    </div>
  );
}

export default App;
