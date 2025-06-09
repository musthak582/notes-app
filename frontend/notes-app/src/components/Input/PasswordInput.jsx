import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  )
}

export default PasswordInput