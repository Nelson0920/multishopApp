import React from "react";

const ModalActions = ({
      onCancel,
      onSave,
      isFormValid = true,
      isEditMode = false,
      cancelText = "Cancelar",
      saveText = null
}) => {
      const getSaveText = () => {
            if (saveText) return saveText;
            return isEditMode ? "Actualizar" : "Crear";
      };

      return (
            <div className="modal-actions">
                  <button
                        className="btn-cancel"
                        onClick={onCancel}
                  >
                        {cancelText}
                  </button>
                  <button
                        className="btn-accept"
                        onClick={onSave}
                        disabled={!isFormValid}
                  >
                        {getSaveText()}
                  </button>
            </div>
      );
};

export default ModalActions;
