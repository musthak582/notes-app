import { useEffect } from 'react'
import { LuCheck } from "react-icons/lu"
import { MdOutlineDelete } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose, isShown])

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-50"
          role="alert"
          aria-live="assertive"
        >
          <div className={`flex items-start w-full max-w-xs p-4 rounded-lg shadow-lg 
            ${type === "delete" ? 'bg-red-50' : 'bg-green-50'}
            border ${type === "delete" ? 'border-red-100' : 'border-green-100'}`}>

            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg
              ${type === "delete" ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'}`}>
              {type === 'delete' ? (
                <MdOutlineDelete className="w-5 h-5" />
              ) : (
                <LuCheck className="w-5 h-5" />
              )}
            </div>

            <div className="ml-3 text-sm font-normal text-gray-800">
              {message}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 rounded-lg focus:ring-2
                focus:ring-gray-300 hover:bg-gray-100/50 transition-colors
                text-gray-500 hover:text-gray-900"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast