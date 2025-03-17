import React, { useState } from "react";

// react icons
import { IoCloudUploadOutline } from "react-icons/io5";

const DragToUpload = ({ onFileSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection when dropped or clicked
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    handleFile(file);
    setIsDragging(false);
  };

  // Function to validate and display the image
  const handleFile = (file) => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setErrorMessage("");
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);

      // Notify parent component of the selected file
      onFileSelect?.(file);
    } else {
      setErrorMessage("Please upload an image file.");
      setSelectedImage(null);

      // Notify parent component of invalid selection
      onFileSelect?.(null);
    }
  };

  // Handle drag over event to allow the drop
  const handleImageDragOver = (e) => e.preventDefault();
  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div
        className={`${
          isDragging ? "border-blue-300 !bg-blue-50" : "border-gray-300"
        } ${
          selectedImage ? "" : "border-dashed border-2 p-6"
        }   w-full h-64 flex flex-col justify-center items-center bg-white`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        onDragOver={handleImageDragOver}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-cover  "
          />
        ) : (
          <>
            {isDragging ? (
              <h5 className="text-[2rem] text-blue-700 font-[600]">
                Drop Here
              </h5>
            ) : (
              <>
                <IoCloudUploadOutline className="text-[3rem] mb-4 text-gray-400" />
                <p className="text-gray-500 text-center text-[1.1rem] font-[500] mb-2">
                  Drag & Drop your image here
                </p>
                <p className="text-gray-400">or</p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer py-2 px-4 bg-gray-200   mt-2"
                >
                  Browse File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileDrop}
                />
              </>
            )}
          </>
        )}
      </div>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {selectedImage && (
        <div className="mt-4">
          <button
            onClick={() => {
              setSelectedImage(null);
              onFileSelect?.(null); // Notify parent of image removal
            }}
            className="bg-red-500 text-white px-4 py-2  "
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default DragToUpload;
