import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useAuth0 } from "@auth0/auth0-react"

import { setSignupData } from "../../slices/authSlice"
import { sendOtp, auth0_login } from "../../services/Operations/authApi"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loginWithRedirect, user, isAuthenticated } = useAuth0()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Password Signup Flow
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    dispatch(setSignupData(formData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  // Auth0 Signup Effect
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(auth0_login(user, navigate))
    }
  }, [isAuthenticated, user])

  return (
    <div>
      {/* Email/Password Signup Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label>
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded bg-richblack-800 p-3 text-richblack-5"
            />
          </label>

          {/* Last Name */}
          <label>
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded bg-richblack-800 p-3 text-richblack-5"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="mb-1 text-[0.875rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded bg-richblack-800 p-3 text-richblack-5"
          />
        </label>

        {/* Password */}
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 rounded bg-yellow-400 font-bold py-2 px-4 text-richblack-900"
        >
          Create Account
        </button>
      </form>

       {/* Or divider */}
      <div className="my-4 text-center text-sm text-richblack-300">OR</div>

      {/* Auth0 Signup Button */}
      <button
        onClick={() => loginWithRedirect()}
        className="mb-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 py-[10px] text-white font-semibold"
      >
        Sign up with Google
      </button>
    </div>
  )
}

export default SignupForm;
