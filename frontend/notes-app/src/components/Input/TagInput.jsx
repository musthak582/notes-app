// TagInput.jsx
import React, { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue !== "" && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue])
      setInputValue("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 rounded-full p-0.5 hover:bg-indigo-200 transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          value={inputValue}
          className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Add a tag and press Enter"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg border border-indigo-600 transition-colors"
          onClick={addNewTag}
          aria-label="Add tag"
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default TagInput