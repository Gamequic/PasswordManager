import React, { useRef } from 'react';
import {Button, ButtonGroup} from "@nextui-org/react";

const ImageUploader = ({ selectedImage, setSelectedImage, className }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <Button className={className} color="primary" variant="ghost" onClick={handleButtonClick}>
        Add image
      </Button>  
    </div>
  );
};

export default ImageUploader;
