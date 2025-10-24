import React from 'react'
// Styles
import '../../styles/HelpModal.scss'

const HelpModal = ({ onClose }) => {
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <span className='btn_reference_help'>▲</span>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <div className="help-header">
          <h3 className="help-title">Ayuda</h3>
          <button className="modal-close" onClick={handleCloseModal}>
            ×
          </button>
        </div>
        <div className="help-content">
          <div className="help-item">
            <span className="help-message">📧 Contactar soporte</span>
          </div>
          <div className="help-item">
            <span className="help-message">📄 Ver preguntas frecuentes (FAQ)</span>
          </div>
          <div className="help-item">
            <span className="help-message">📚 Guía de usuario</span>
          </div>
          <div className="help-item">
            <span className="help-message">🛠️ Reportar un problema</span>
          </div>
          <div className="help-item">
            <span className="help-message">❓ ¿Cómo funciona esta sección?</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
