import React, { useState } from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './routes/Home';
import Leit from './routes/Leit';
import Event from './routes/Event';
import Profile from './routes/Profile';
import LoginModal from './modals/loginmodal';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import VidburdurModal from './modals/vidburdmodal';
import LeitModal from './modals/leitmodal';
import NewUserModal from './modals/newusermodal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function App() {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isVidburdurModalOpen, setVidburdurModalOpen] = useState(false);
  const [isLeitModalOpen, setLeitModalOpen] = useState(false);
  const [isNewUserModalOpen, setNewUserModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setVidburdurModalOpen(false);
    setLeitModalOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openVidburdurModal = () => {
    setVidburdurModalOpen(true);
    setLeitModalOpen(false);
    setLoginModalOpen(false);
  };

  const closeVidburdurModal = () => {
    setVidburdurModalOpen(false);
  };

  const openLeitModal = () => {
    setLeitModalOpen(true);
    setVidburdurModalOpen(false);
    setLoginModalOpen(false);
  };

  const closeLeitModal = () => {
    setLeitModalOpen(false);
  };

  const openNewUserModal = () => {
    setNewUserModalOpen(true);
  };

  const closeNewUserModal = () => {
    setNewUserModalOpen(false);
  }


  const handleSearch = (searchQuery) => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <Navbar openLoginModal={openLoginModal} openLeitModal={openLeitModal} openVidburdurModal={openVidburdurModal} openNewUserModal={openNewUserModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leit" element={<Leit filteredEvents={filteredEvents}/>} />
        <Route path="/event/:eventID" element={<Event />} />
        <Route path="/profile/:userID" element={<Profile openVidburdurModal={openVidburdurModal} />}  />
      </Routes>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel='Login Modal'
      >
        <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} openNewUserModal={openNewUserModal} />
      </Modal>


      <Modal
        isOpen={isVidburdurModalOpen}
        onRequestClose={closeVidburdurModal}
        contentLabel='Vidburdur Modal'
      >
        <VidburdurModal isOpen={isVidburdurModalOpen} onRequestClose={closeVidburdurModal}/>

      </Modal>

      <Modal
        isOpen={isLeitModalOpen}
        onRequestClose={closeLeitModal}
        contentLabel="Leit Modal"
      >
        <LeitModal
          isOpen={isLeitModalOpen}
          onRequestClose={closeLeitModal}
          onSearch={handleSearch}
        />
      </Modal>

      <Modal
        isOpen={isNewUserModalOpen}
        onRequestClose={closeNewUserModal}
        contentLabel='NewUser Modal'
      >
        <NewUserModal isOpen={isNewUserModalOpen} onRequestClose={closeNewUserModal}/>

      </Modal>

      <Footer />


    </>
  );

}

export default App;