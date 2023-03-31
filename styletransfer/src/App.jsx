import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';

function App() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  
  const handleStyleTransfer = () => {
    // Implement style transfer API call here.
    console.log('Performing style transfer...');
  };

  return (
    <div className="container">
      <h1>Neural Style Transfer</h1>
      <ImageUploader title="Content Image" onImageUpload={setContentImage} />
      <ImageUploader title="Style Image" onImageUpload={setStyleImage} />
      <button
        onClick={handleStyleTransfer}
        disabled={!contentImage || !styleImage}
      >
        Transfer Style
      </button>
    </div>
  );
}

export default App;