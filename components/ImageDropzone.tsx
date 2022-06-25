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
    <div {...getRootProps()} 
      className="w-full flex bg-gray-100 h-96 rounded-xl mt-4 mx-8 p-8 items-center justify-center cursor-pointer hover:bg-indigo-100 border-4 border-dotted border-gray-400">
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="text-center text-xl text-gray-900 font-semibold">Drop the files here ...</div>
      ) : (
        <div className="text-center text-xl text-gray-600 font-semibold">Drag &amp; drop some files here, or click to select files</div>
      )}
    </div>
  );
};

export default ImageDropzone;
