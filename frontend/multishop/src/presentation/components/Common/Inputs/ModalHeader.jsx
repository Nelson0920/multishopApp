import React from "react";

const ModalHeader = ({
      title,
      icon: Icon,
      iconColor = "#36aad4",
      iconSize = 24
}) => {
      return (
            <div className="modal-header">
                  <h2 className="modal-title">{title}</h2>
                  <div className="modal-icon">
                        <Icon size={iconSize} color={iconColor} />
                  </div>
            </div>
      );
};

export default ModalHeader;
