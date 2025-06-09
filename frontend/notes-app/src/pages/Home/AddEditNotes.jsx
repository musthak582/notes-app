// AddEditNotes.jsx
import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note added successfully")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Title is required")
      return
    }

    if (!content) {
      setError("Content is required")
      return
    }

    setError("")
    setIsSubmitting(true)

    if (type === "edit") {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Enter note title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Content</label>
        <textarea
          placeholder="Write your note content here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[150px]"
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          onClick={handleAddNote}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === "edit" ? "Updating..." : "Adding..."}
            </span>
          ) : (
            type === "edit" ? "Update Note" : "Add Note"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddEditNotes