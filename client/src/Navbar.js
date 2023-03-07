import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
  return (
   <div>
     <header>
      <h1>CBB News</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
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
   </div>
  );
}

export default Navbar;
