import "./App.css";
import {Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import NavBar from "./components/common/Navbar";
import Login from "./pages/login";
import VerifyEmail from "./pages/verifyEmail";
import Dashboard from "./pages/Dashboard"
import AllFiles from "./components/core/AllFiles";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Error from "./pages/Error";
import FileUpload from "./pages/FileUpload";
import DashBoardHome from "./components/core/DashBoardHome";


function App() {

  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <NavBar/>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="signup" element={<Signup/>} />
      <Route
        path="login"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      />
      <Route
        path="verify-email"
        element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }
      />


      {/* {Private Routes} */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DashBoardHome />} />
        <Route path="upload" element={<FileUpload />} />
        <Route path="my-files" element={<AllFiles />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
   </div>
  );
}

export default App;