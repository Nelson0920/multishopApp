import React from 'react'
import { useNavigate } from 'react-router-dom'
import createOptions from '../../utils/createModalOptions'
import '../../styles/ModalCreate.scss'

const ModalCreate = ({ onClose }) => {
  const navigate = useNavigate()
  const categories = [...new Set(createOptions.map(option => option.category))]

  const getOptionsByCategory = (category) => {
    return createOptions.filter(option => option.category === category)
  }

  const handleOptionClick = (path) => {
    onClose()
    navigate(path) // Redirige a la ruta
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
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleOptionClick(option.path)}
                    >
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
