import { useState } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  
  function handleInputChange(event) {
    setText(event.target.value);
  }
  
  function handleSynthesizeClick() {
    const url = `http://localhost:5000/synthesize?text=${text}`;
    const audio = new Audio(url);
    audio.play();
  }
  
  return (
    <div>
      <label htmlFor="text">Enter text to synthesize:</label>
      <input type="text" id="text" name="text" value={text} onChange={handleInputChange} />
      <button type="button" onClick={handleSynthesizeClick}>Synthesize</button>
    </div>
  );
}

export default TextToSpeech;