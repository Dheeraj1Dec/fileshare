import Upload from "../components/core/Upload";

const FileUpload = () => {
  return (
    <div className="min-h-[90vh] bg-gray-950 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center tracking-tight">
          Upload Your File
        </h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
            <Upload />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

