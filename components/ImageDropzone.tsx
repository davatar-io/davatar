import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onImageSelect: (image: any) => void;
}

const ImageDropzone = ({ onImageSelect }: Props) => {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Do something with the files
    console.log(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ImageDropzone;
