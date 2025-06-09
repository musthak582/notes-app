import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { RiBrainFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = ({
  userInfo,
  onSearchNotes,
  handleClearSearch,
  showSearch = true,
  showProfile = true,
  showSignIn = false
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [waveState, setWaveState] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Set up waving animation interval
    const waveInterval = setInterval(() => {
      setWaveState(prev => !prev)
    }, 2000) // Switch every 2 seconds

    return () => clearInterval(waveInterval)
  }, [])

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
              <RiBrainFill className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              Brain<span className="text-indigo-600">Drop</span>
            </h1>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            {showSearch && (
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            )}
          </div>

          <div className="ml-auto flex items-center">
            {showSignIn && !userInfo && (
              <Link
                to="/signup"
                className="w-10 h-10 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <motion.span
                  animate={{
                    rotate: waveState ? [0, 15, -15, 0] : 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {waveState ? '👋' : '✋'}
                </motion.span>
                
              </Link>
            )}
            {showProfile && (
              <ProfileInfo
                userInfo={userInfo}
                onLogout={onLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar