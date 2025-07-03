import { Upload, Shield, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* Header */}


      {/* Hero Section */}
      <main className="px-6 py-15">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Secure and Simple
            <span className="block pb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f12711] to-[#f5af19]">
              File Sharing
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Share your files securely with anyone, anywhere. Upload, organize, and collaborate with ease using our modern file-sharing platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-gray-300 text-white rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 hover:text-richblack-800 transition-all duration-200"
            >
              Login to Account
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Storage</h3>
              <p className="text-gray-600">Your files are encrypted and stored securely with enterprise-grade security.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Upload and download files at blazing speeds with our optimized infrastructure.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Sharing</h3>
              <p className="text-gray-600">Share files with anyone using simple links and advanced permission controls.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
