import React, { useState } from 'react';
import './ImageUploader.css';

function ImageUploader({ onImageUpload, title }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <h2>{title}</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
}

export default ImageUploader;