import React from 'react'
// Styles
import '../../styles/UserNavbar.scss'

const UserNavbar = ({ onClose }) => {
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="userNav-modal" onClick={(e) => e.stopPropagation()}>
        <div className="userNav-header">
          <div className='userNav_img'/>
          <section>
            <h3 className="userNav-name">nombre usuario</h3>
            <span className="userNav-email">nombreusuario@gmail.com</span>
          </section>
          <button className="modal-close" onClick={handleCloseModal}>
            ×
          </button>
        </div>
        <div className="userNav-content">
          <div className="userNav-item">
            <span className="userNav-message">👤 Mi Perfil</span>
          </div>
          <div className="userNav-item">
            <span className="userNav-message">🔒 Cambiar Contraseña</span>
          </div>
          <div className="userNav-item">
            <span className="userNav-message">🚪 Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
