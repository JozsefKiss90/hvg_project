import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function BlogPost() {
  const location = useLocation();
  const { content } = location.state || {};

  if (!content) {
    return null;
  }

  const sentences = content.match(/[^.!?]+[.!?]+['"]?\s*/g);
  const firstSentence = sentences[0];
  const restOfSentences = sentences.slice(1);
  const pairedSentences = [];

  for (let i = 0; i < restOfSentences.length; i += 2) {
    const sentence1 = restOfSentences[i];
    const sentence2 = restOfSentences[i + 1];
    pairedSentences.push(`${sentence1.trim()} ${sentence2.trim()}`);
  }

  return (
    <div>
      <Navbar />
      <h1>{firstSentence}</h1>
      {pairedSentences.map((pairedSentence, index) => (
        <p key={index}>{pairedSentence}</p>
      ))}
    </div>
  );
}

export default BlogPost;
