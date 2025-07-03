import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiles } from '../../services/Operations/fileApi';
import { FiFileText, FiImage, FiVideo } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AllFiles = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { files, fetched } = useSelector((state) => state.file);

  useEffect(() => {
    console.log("Fetching files for token:", token);
    if (token  && !fetched) {
      dispatch(getAllFiles(token));
    }
  }, [dispatch, token]);
  
  {/* Checking the file type and showing preview */}
  const getFileTypeIcon = (fileName) => {
    if (!fileName) return <FiFileText className="text-xl" />;
    if (fileName.match(/\.(jpeg|jpg|png|gif)$/i)) return <FiImage className="text-xl" />;
    if (fileName.match(/\.(mp4|webm)$/i)) return <FiVideo className="text-xl" />;
    return <FiFileText className="text-xl" />;
  };

  const renderFilePreview = (file) => {
    const { fileName, url } = file;

    if (!fileName || !url) {
      return (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-red-400 rounded-md">
          Invalid file data
        </div>
      );
    }

    if (fileName.match(/\.(jpeg|jpg|png|gif)$/i)) {
      return <img src={url} alt={fileName} className="w-full h-48 object-cover rounded-md" />;
    } else if (fileName.match(/\.pdf$/i)) {
      return <iframe src={url} title={fileName} className="w-full h-48 rounded-md border" />;
    } else if (fileName.match(/\.(mp4|webm)$/i)) {
      return <video controls src={url} className="w-full h-48 rounded-md" />;
    } else {
      return (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-gray-400 rounded-md">
          No preview available
        </div>
      );
    }
  };

  {/* Copying the link to clipboard */}

  const [copiedFileId, setCopiedFileId] = useState(null);

  const handleCopy = async (textToCopy, fileId) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedFileId(fileId);
      toast.success("Copied to ClipBoard");
      setTimeout(() => setCopiedFileId(null) , 1000);
    } catch (error) {
      console.error("Failed to Copy: ", error);
      toast.error("Failed to Copy")
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Uploaded Files</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(files) && files.map((file) => (
          <div
            key={file._id}
            className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800"
          >
            <div className="mb-3">{renderFilePreview(file)}</div>

            <div className="space-y-2">
              <p className="text-lg font-semibold truncate flex items-center gap-2">
                {getFileTypeIcon(file.fileName)} {file.fileName || "Untitled"}
              </p>
              <p className="text-sm text-gray-400">
                Uploaded At: {new Date(file.uploadedAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Expires At: {new Date(file.expiry).toLocaleString()}
              </p>
              <div className='flex gap-x-2'>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition"
                >
                  View File
                </a>
                <button
                  onClick={() => handleCopy(file.shortUrl, file._id)}                  
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition"
                >
                  {copiedFileId === file._id ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFiles;
