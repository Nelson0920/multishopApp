import React from "react";
import { MdClose } from "react-icons/md";

const ModalHeader = ({
      title,
      icon: Icon,
      iconColor = "#36aad4",
      iconSize = 24,
      onClose
}) => {
      return (
            <div className="modal-header">
                  <div className="modal-title-section">
                        {Icon && (
                              <div className="modal-icon">
                                    <Icon size={iconSize} color={iconColor} />
                              </div>
                        )}
                        <h2 className="modal-title">{title}</h2>
                  </div>
                  {onClose && (
                        <button
                              className="modal-close-btn"
                              onClick={onClose}
                              title="Cerrar"
                        >
                              <MdClose size={20} />
                        </button>
                  )}
            </div>
      );
};

export default ModalHeader;
