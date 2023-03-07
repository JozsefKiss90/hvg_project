import React from 'react';

function BlogPost2({ content }) {
  // Check if the content is not null or undefined
  if (!content) {
    return null;
  }
  console.log(content)

  // Use regular expressions to split the content into sentences
  const sentences = content.match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?<=\s|^)/g);

  // Split the sentences into pairs
  const sentencePairs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    if (i + 1 < sentences.length) {
      sentencePairs.push(sentences[i] + ' ' + sentences[i + 1]);
    } else {
      sentencePairs.push(sentences[i]);
    }
  }

  return (
    <div>
      {/* Check if there is at least one sentence */}
      {sentences && sentences.length > 0 && (
        <>
          {/* Render the first sentence as an <h1> tag */}
          <h1>{sentences[0]}</h1>

          {/* Render the sentence pairs as <p> tags */}
          {sentencePairs.map((sentencePair, index) => (
            <p key={index}>{sentencePair}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default BlogPost2;
