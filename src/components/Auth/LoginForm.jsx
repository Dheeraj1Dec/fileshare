import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import { login, auth0_login } from "../../services/Operations/authApi"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("coming here")
      dispatch(auth0_login(user, navigate))
    }
  }, [isAuthenticated, user])

  return (
    <div className="mt-6 flex w-full flex-col gap-y-6">
      <form
        onSubmit={handleOnSubmit}
        className="flex w-full flex-col gap-y-4"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </label>

        <button
          type="submit"
          className="mt-4 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="relative w-full -my-2 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-richblack-600" />
        </div>
        <div className="relative bg-richblack-900 px-4 text-sm text-richblack-400">
          OR
        </div>
      </div>

      {/* Auth0 Login Button */}
      <button
        onClick={() => loginWithRedirect()}
        className="mb-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 py-[10px] text-white font-semibold"
      >
        Login with Google
      </button>
    </div>
  )
}

export default LoginForm
