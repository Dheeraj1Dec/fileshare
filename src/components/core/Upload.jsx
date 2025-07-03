import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import { fileUpload } from '../../services/Operations/fileApi';

const Upload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const {token} = useSelector((state) => state.auth);
  
  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    dispatch(fileUpload(formData, token));
    setFile(null);
    setPreviewSource(null);
    setShowModal(false);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      previewFile(selectedFile);
      if (onFileSelect) onFileSelect(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
      "application/pdf": []
    },
    onDrop,
  });

  const renderPreview = () => {
    if (!previewSource || !file) return null;

    if (file.type.startsWith("image/")) {
      return <img src={previewSource} alt="Preview" className="w-full h-auto rounded-md object-contain" />;
    }

    if (file.type.startsWith("video/")) {
      return <Player aspectRatio="16:9" playsInline src={previewSource} />;
    }

    if (file.type === "application/pdf") {
      return (
        <iframe
          src={previewSource}
          title="PDF Preview"
          className="w-full h-[500px] border rounded-md"
        ></iframe>
      );
    }

    return <p className="text-sm text-white">Preview not supported</p>;
  };

  return (
    <>
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 p-6 text-white">
        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`min-w-[400px] min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed transition-all duration-200 ${
            isDragActive ? "border-blue-400 bg-blue-950/40" : "border-gray-500 bg-gray-800"
          } rounded-xl cursor-pointer shadow-lg hover:shadow-2xl`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-2">
            <div className="grid aspect-square w-16 place-items-center rounded-full bg-gray-700 shadow-md">
              <FiUploadCloud className="text-3xl text-yellow-50" />
            </div>
            <p className="text-center text-md text-gray-300">
              Drag & drop a file or <span className="font-semibold text-yellow-300">Browse</span>
            </p>
            <p className="text-xs text-gray-400">Supports images, videos, PDFs</p>
          </div>
        </div>

        {/* File Info Section */}
        {file && (
          <div className="flex justify-between gap-4 bg-gray-800 p-5 rounded-xl w-full shadow-lg max-h-[75px]">
            <p className="text-lg mt-1 font-semibold max-w-[50%] truncate text-yellow-100">{file.name}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 bg-blue-600 font-bold rounded-3xl hover:bg-blue-700 text-sm transition"
              >
                Preview
              </button>
              <button
                onClick={handleUpload}
                className="px-5 py-2 bg-green-600 font-bold rounded-3xl hover:bg-green-700 text-sm transition"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewSource(null);
                  setShowModal(false);
                }}
                className="px-5 py-2 bg-red-600 font-bold rounded-3xl hover:bg-red-700 text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-auto shadow-2xl border border-gray-700 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">File Preview</h2>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                Close
              </button>
            </div>
            {renderPreview()}
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
