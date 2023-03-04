import './App.css';
import BlogPost from './BlogPost';
import './App.css';
import TextToSpeech from './TextToSpeech';
import AudioPlayer from './AudioPlayer'
function App() {
  return (
    <div>
      <header>
        <h1>BBC News</h1>
        <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/world">World</a></li>
            <li><a href="/uk">UK</a></li>
            <li><a href="/business">Business</a></li>
            <li><a href="/politics">Politics</a></li>
            <li><a href="/health">Health</a></li>
            <li><a href="/education">Education</a></li>
            <li><a href="/science">Science</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/entertainment">Entertainment</a></li>
            <li><a href="/sports">Sports</a></li>
          </ul>
          <ul>
          <li><a href="/search">Search</a></li>
          </ul>
          </nav>
      </header>
      <div>
      <AudioPlayer audioId={'6403a0d54541a730c423076a'}/>
      </div>
      <main>
        <article>
          <h2>Ukrainian War: Latest Updates</h2>
          <BlogPost />
        </article>
      </main>
      <footer>
        <p>&copy; 2023 BBC News</p>
      </footer>
    </div>
  );
}

export default App;
