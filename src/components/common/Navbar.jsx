import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout as logoutAction } from "../../services/Operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { FolderOpen, LogOut, Upload, User } from "lucide-react";

const NavBar = () => {
  const dispatch = useDispatch();
  const { token, signupData } = useSelector((state) => state.auth);
  const { logout: auth0Logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const isUploadTab = path.includes("/dashboard/upload");
  const isFilesTab = path.includes("/dashboard/my-files");

  const handleLogout = () => {
    const loginType = localStorage.getItem("loginType");
    const isAuth0 = loginType === "auth0";
    logoutAction(navigate, isAuth0, auth0Logout)(dispatch);
  };

  const homeLink = token ? "/dashboard" : "/";

  return (
    <header className="px-6 pt-4 flex justify-between items-center bg-gray-950 shadow-md">
      {/* Logo */}
      <Link to={homeLink}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">FileShare</span>
        </div>
      </Link>

      {!token && (
        <div>
          <Link to={"/login"}>
            <button className="px-4 py-2 font-extrabold text-white hover:text-blue-500 transition-colors transform hover:scale-105">
              Log in
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Sign up
            </button>
          </Link>
        </div>
      )}

      {/* Authenticated User Navbar */}
      {token && (
        <div className="flex gap-[18vw] items-center text-white">
          {/* Tabs */}
          <div className="flex gap-x-6">
            <button
              onClick={() => navigate("/dashboard/upload")}
              className={`flex items-center gap-2 text-lg font-semibold transition-all ${
                isUploadTab
                  ? "text-yellow-400"
                  : "hover:text-blue-400"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>

            <button
              onClick={() => navigate("/dashboard/my-files")}
              className={`flex items-center gap-2 text-lg font-semibold transition-all ${
                isFilesTab
                  ? "text-yellow-400"
                  : "hover:text-blue-400"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>My Files</span>
            </button>
          </div>

          {/* User Info and Logout */}
          <div className="flex gap-x-4 items-center">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-100">
                  {signupData?.firstName}
                </p>
                <p className="text-gray-100">{signupData?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200"
            >
              LogOut
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
