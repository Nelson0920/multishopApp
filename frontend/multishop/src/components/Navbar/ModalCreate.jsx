// Dependencies
import React from 'react'
// Data
import createOptions from '../../utils/createModalOptions'
// Styles
import '../../styles/ModalCreate.scss'

const ModalCreate = ({ onClose }) => {
  const categories = [...new Set(createOptions.map(option => option.category))]

  const getOptionsByCategory = (category) => {
    return createOptions.filter(option => option.category === category)
  }

  const handleOptionClick = (title) => {
    console.log(`Opción seleccionada: ${title}`)
    onClose() // Opcional: cerrar modal al seleccionar
  }

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>×</button>

        <div className="modal-content">
          <div className="modal-categories">
            {categories.map((category) => (
              <div key={category} className="modal-category">
                <h4 className="category-title">{category}</h4>
                <div className="category-options">
                  {getOptionsByCategory(category).map((option, index) => (
                    <button key={index} className="option-button" onClick={() => handleOptionClick(option.title)}>
                      {option.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCreate
