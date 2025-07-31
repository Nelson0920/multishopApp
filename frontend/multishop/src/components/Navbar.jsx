// Dependecies
import React , {useState}                           from 'react'
import { IoIosNotifications }                       from "react-icons/io"
import { IoSettingsSharp, IoSearch, IoAddOutline  } from "react-icons/io5"
// Styles
import '../styles/Navbar.scss'
import logo from '../assets/images/logo.png';
// Modals
import ModalCreate from './Navbar/ModalCreate'
import NotifyModal from './Navbar/NotifyModal'
import HelpModal from './Navbar/HelpModal'
import SearchModal from './Navbar/SearchModal'
import UserModal from './Navbar/UserModal'


const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  const toggleNotifyModal = () => {
    setShowNotifyModal(prev => !prev)
  }

  const toggleHelpModal = () => {
    setShowHelpModal(prev => !prev)
  }

  const toggleSearchModal = () => {
    setShowSearchModal(prev => !prev)
  }

  const toggleUserModal = () => {
    setShowUserModal(prev => !prev)
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <nav className='navbar'>
        <figure className='logo_container'>
          <img src={logo} alt="logo" />
        </figure>

        <div className='name_company'>
          <span>MULTISHOP - NOMBRE</span>
        </div>

        <div className='container_buttons'>
          <div className='container_icons'>
            <IoIosNotifications className='icon_notification' onClick={toggleNotifyModal}/>
            <IoSettingsSharp className='icon_setting'/>
          </div>

          <div className="container_buttons_actions">
            <button className='button_search' onClick={toggleSearchModal}>
              <IoSearch className='icon_button'/>
              Buscar
            </button>
            <button className='button_search' onClick={toggleHelpModal}>
              Ayuda
            </button>
            <button className='button_create' onClick={openModal}>
              <IoAddOutline className='icon_create'/> 
              <a>Crear</a>
            </button>
          
            <button className='button_user' onClick={toggleUserModal}>
              Username ▼
            </button> 
          </div>

        </div>
      </nav>

      {/* Modals */}
      {showNotifyModal && <NotifyModal onClose={() => setShowNotifyModal(false)} />}
      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
      {showModal && <ModalCreate onClose={closeModal} />}
    </>
    
  )
}

export default Navbar