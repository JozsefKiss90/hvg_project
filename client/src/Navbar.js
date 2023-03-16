import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
  return (
   <div>
     <header>
     <Link  to="/" > 
        <h1 className='logo'>hvg-app</h1>
     </Link>
      <nav>
      </nav>
    </header>
    <header className='header2'>
      <nav>
        <ul>
          <li><Link to="/"> Friss hírek </Link></li>
          <li><Link to="/">Itthon</Link></li>
          <li><Link to="/">Világ</Link></li>
          <li><Link to="/">Gazdaság</Link></li>
          <li><Link to="/">Tech</Link></li>
          <li><Link to="/">Vélemény</Link></li>
          <li><Link to="/">Sport</Link></li>
          <li><Link to="/">Autó</Link></li>
          <li><Link to="/">Vállakozás</Link></li>
          <li><Link to="/">Kult</Link></li>
          <li><Link to="/">Élet+Stlus</Link></li>
        </ul>
      </nav>
    </header>
   </div>
  );
}

export default Navbar;
