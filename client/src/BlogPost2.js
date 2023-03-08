import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
function BlogPost2() {

  const location = useLocation();
  const { content } = location.state || {};

  if (!content) {
    return null;
  }
  
  const sentences = content.match(/[^.!?]+[.!?]+['"]?\s*/g);
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    if (i + 1 < sentences.length) {
      paragraphs.push(`${sentences[i].trim()} ${sentences[i + 1].trim()}`);
    } else {
      paragraphs.push(sentences[i].trim());
    }
  }

  return (
    <div>
      <Navbar/>
      {paragraphs.length > 0 && (
        <>
          <h1>{paragraphs[0]}</h1>
          {paragraphs.slice(1).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default BlogPost2;
