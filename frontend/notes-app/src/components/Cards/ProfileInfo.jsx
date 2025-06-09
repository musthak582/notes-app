import React from 'react'
import { getInitials } from '../../utils/helper'
import { FiLogOut } from 'react-icons/fi'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
          {getInitials(userInfo?.fullName)}
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="hidden md:block">
        <p className="text-sm font-medium text-gray-800">{userInfo?.fullName}</p>
        <button
          onClick={onLogout}
          className="flex items-center text-xs text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FiLogOut className="mr-1" /> Sign out
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo