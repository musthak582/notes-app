import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { motion, AnimatePresence } from 'framer-motion'

import AddNotesImg from '../../assets/images/add-note.svg'
import NoDataImg from '../../assets/images/no-data.svg'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    data: null,
    type: "add",
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const noteItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2
      }
    }
  }

  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // handle toast
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  };

  // Handle edit note
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    })
  }

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted successfully", "delete")
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Error fetching notes:", error);
      }
    }
  };

  // Search for Notes
  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error searching notes:", error);
    }
  };

  // Handle Pin
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully")
        getAllNotes();
      }
    } catch (error) {
      console.log("Error updating note:", error);
    }
  }

  // Handle Clear search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Pinned Notes Section */}
        {allNotes.some(note => note.isPinned) && (
          <div className="mb-12">
            <motion.h2
              className="text-xl font-medium text-gray-700 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              📌 Pinned Notes
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {allNotes
                .filter(note => note.isPinned)
                .map((item) => (
                  <motion.div
                    key={item._id}
                    variants={noteItem}
                    whileHover="hover"
                    layout
                  >
                    <NoteCard
                      title={item.title}
                      date={item.createdAt}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item)}
                      onPinNote={() => updateIsPinned(item)}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        )}

        {/* All Notes Section */}
        <div>
          <motion.h2
            className="text-xl font-medium text-gray-700 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {allNotes.some(note => note.isPinned) ? '📒 All Notes' : 'Your Notes'}
          </motion.h2>

          {allNotes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {allNotes
                .filter(note => !note.isPinned)
                .map((item) => (
                  <motion.div
                    key={item._id}
                    variants={noteItem}
                    whileHover="hover"
                    layout
                  >
                    <NoteCard
                      title={item.title}
                      date={item.createdAt}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item)}
                      onPinNote={() => updateIsPinned(item)}
                    />
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <EmptyCard
                imgSrc={isSearch ? NoDataImg : AddNotesImg}
                message={isSearch ?
                  `No matching notes found. Try different keywords.` :
                  `Click the + button below to create your first note!`}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed right-6 bottom-6 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            data: null,
            type: "add",
          })
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          <MdAdd className="text-2xl" />
        </motion.div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {openAddEditModal.isShown && (
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "1rem",
              },
              content: {
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0',
                inset: 'auto',
                maxHeight: '90vh',
                width: '100%',
                maxWidth: '640px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                overflow: 'hidden',
              }
            }}
            contentLabel="Add/Edit Note"
            ariaHideApp={false}
            closeTimeoutMS={200}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Modal Header */}
              <div className={`sticky top-0 z-10 px-6 py-4 border-b ${openAddEditModal.type === "edit" ? 'bg-indigo-600' : 'bg-indigo-500'}`}>
                <h2 className="text-xl font-semibold text-white">
                  {openAddEditModal.type === "edit" ? 'Edit Note' : 'Create New Note'}
                </h2>
                <motion.button
                  onClick={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-indigo-700 transition-colors"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="bg-white">
                <AddEditNotes
                  type={openAddEditModal.type}
                  noteData={openAddEditModal.data}
                  onClose={() => {
                    setOpenAddEditModal({
                      isShown: false,
                      type: "add",
                      data: null
                    })
                  }}
                  getAllNotes={getAllNotes}
                  showToastMessage={showToastMessage}
                />
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  )
}

export default Home