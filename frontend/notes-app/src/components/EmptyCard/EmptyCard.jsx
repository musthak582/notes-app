import { motion } from 'framer-motion'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src={imgSrc}
          alt="No notes"
          className="w-48 h-48 object-contain opacity-80"
        />
      </motion.div>

      <motion.p
        className="mt-6 text-gray-600 max-w-md mx-auto text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {message}
      </motion.p>

      <motion.div
        className="mt-8 h-1 w-24 bg-indigo-100 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
      />
    </motion.div>
  )
}

export default EmptyCard