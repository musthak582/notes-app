import { MdOutlinePushPin, MdEdit, MdDelete } from 'react-icons/md'
import moment from 'moment'
import { motion } from 'framer-motion'

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <motion.div
      className={`relative border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${isPinned ? 'border-l-4 border-l-indigo-500' : ''}`}
      whileHover={{
        y: -4,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {/* Pin Button */}
      <motion.button
        onClick={onPinNote}
        className={`absolute top-4 right-4 p-1 rounded-full ${isPinned ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:bg-gray-100'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <MdOutlinePushPin className="text-lg" />
      </motion.button>

      {/* Note Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-1 text-lg">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            {moment(date).format("MMM D, YYYY")}
          </p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {content}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
        <motion.button
          onClick={onEdit}
          className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MdEdit className="text-lg" />
        </motion.button>
        <motion.button
          onClick={onDelete}
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MdDelete className="text-lg" />
        </motion.button>
      </div>

      {/* Pinned Indicator */}
      {isPinned && (
        <div className="absolute -top-2 -left-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default NoteCard