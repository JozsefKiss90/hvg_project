import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function BlogPost() {
  const location = useLocation();
  const { content, title } = location.state || {};

  if (!content) {
    return null;
  } 
  
  const sentences = content.match(/[^.!?]+[.!?]+['"]?\s*/g);
  const pairedSentences = [];

  for (let i = 0; i < sentences.length; i += 2) {
    const sentence1 = sentences[i];
    const sentence2 = sentences[i + 1];
    if (sentence2) {
      pairedSentences.push(`${sentence1.trim()} ${sentence2.trim()}`);
    } else {
      pairedSentences.push(sentence1.trim());
    }
  }

  return (
    <div>
      <Navbar />
     <div className='blogPost'>
      <h1>{title}</h1>
        {pairedSentences.map((pairedSentence, index) => (
          <p key={index}>{pairedSentence}</p>
        ))}
     </div>
    </div>
  );
}

export default BlogPost;
