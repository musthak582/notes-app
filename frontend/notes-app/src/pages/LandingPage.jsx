import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import Navbar from '../components/Navbar/Navbar'
import dashboardScreenshot from '../assets/images/hero-image.png'
import { motion, AnimatePresence } from 'framer-motion'

const LandingPage = () => {
  const features = [
    "Organize notes with tags & categories",
    "Pin important notes for quick access",
    "Instant search across all notes",
    "Sync across all your devices",
    "Private & secure",
    "Real-time collaboration on notes",
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  const featureItem = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "backOut"
      }
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar showSearch={false} showProfile={false} showSignIn={true} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            variants={item}
          >
            Your Thoughts, <motion.span
              className="text-indigo-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
                backgroundSize: ['200% 200%', '200% 200%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Organized
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            variants={item}
          >
            BrainDrop helps you capture ideas, organize knowledge, and stay productive. Everything you add syncs across all your devices.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            variants={container}
          >
            <motion.div variants={item}>
              <Link
                to="/signup"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Get Started - It's Free
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                to="/login"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dashboard Screenshot */}
        <motion.div
          className="mt-12 rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{
            scale: 1.01,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <img
            src={dashboardScreenshot}
            alt="BrainDrop dashboard interface"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <motion.p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              A better way to organize your notes
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={container}
          >
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="col-span-1 bg-gray-50 rounded-lg p-6"
                  custom={index}
                  variants={featureItem}
                  whileHover="hover"
                >
                  <div className="flex items-start">
                    <motion.div
                      className="flex-shrink-0 bg-indigo-100 rounded-md p-1"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <FiCheck className="h-5 w-5 text-indigo-600" />
                    </motion.div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-indigo-700 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to dive in?
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl mx-auto text-xl text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Start organizing your thoughts today.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/signup"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Get started <motion.span
                animate={{
                  x: [0, 5, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <FiArrowRight className="ml-2" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} BrainDrop. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default LandingPage