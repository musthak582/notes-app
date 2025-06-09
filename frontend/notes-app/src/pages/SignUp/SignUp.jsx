import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiArrowRight } from 'react-icons/fi'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import PasswordInput from '../../components/Input/PasswordInput'
import AuthLayout from '../../components/layouts/AuthLayout'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!name) {
      setError("Please enter your name")
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    if (!password) {
      setError("Please enter a password")
      setIsLoading(false)
      return
    }

    setError("")

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email,
        password
      })

      if (response.data?.error) {
        setError(response.data.message)
      } else if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Organize your thoughts in one place"
    >
      <form onSubmit={handleSignUp} className="space-y-5">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </>
          ) : (
            <>
              Continue <FiArrowRight className="ml-2" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default SignUp