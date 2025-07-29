// Dependecies
import React , {useState}                           from 'react'
import { IoIosNotifications }                       from "react-icons/io"
import { IoSettingsSharp, IoSearch, IoAddOutline  } from "react-icons/io5"
// Styles
import '../styles/Navbar.scss'
import logo from '../assets/images/logo.png';
// Modals
import ModalCreate from './Navbar/ModalCreate'


const Navbar = () => {
  const [showModal, setShowModal] = useState(false)

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
            <IoIosNotifications className='icon_notification'/>
            <IoSettingsSharp className='icon_setting'/>
          </div>

          <div className="container_buttons_actions">
            <button className='button_search'>
              <IoSearch className='icon_button'/>
              Buscar
            </button>
            <button className='button_search'>
              Ayuda
            </button>
            <button className='button_create' onClick={openModal}>
              <IoAddOutline className='icon_create'/> 
              <a>Crear</a>
            </button>
          
            <span className='name_user'>Name User</span> 
          </div>

        </div>
      </nav>

      {/* Modal */}
      {showModal && <ModalCreate onClose={closeModal} />}
    </>
    
  )
}

export default Navbar