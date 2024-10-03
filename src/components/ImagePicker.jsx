import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();
  function handlePickClick() {
    imageInputRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <img
              src={pickedImage}
              alt="image selected by the user"
              className="w-40 h-40"
            />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png , image/jpg , image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
};
export default ImagePicker;
