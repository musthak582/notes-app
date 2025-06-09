import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search by title, content, or tags and press Enter"
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          onClick={onClearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default SearchBar