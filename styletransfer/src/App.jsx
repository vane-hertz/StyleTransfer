import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';

function App() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || !(file instanceof Blob)) {
        reject(new Error('Invalid file object'));
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleStyleTransfer = async () => {
    if (!contentImage || !styleImage) return;
  
    // Encode images as base64 strings
    const contentImageBase64 = await toBase64(contentImage);
    const styleImageBase64 = await toBase64(styleImage);
  
    // Send API request to perform style transfer
    const response = await fetch('/api/style-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `content_image=${encodeURIComponent(contentImageBase64)}&style_image=${encodeURIComponent(styleImageBase64)}`,
    });
  
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
  
    if (response.ok) {
      // Get the stylized image as a blob
      const blob = await response.blob();
  
      console.log('Blob size:', blob.size);
  
      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);
  
      // Set the stylized image as the source of the output image
      setOutputImage(url);
    } else {
      console.error('Error:', response.statusText);
    }
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