import React from "react";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import { TextInput, ModalHeader, ModalActions } from "@components/Common/Inputs";
import { useAuxiliaresModal } from "@hooks/Auxiliares/useAuxiliaresModal";
import "../Auxiliares.scss";

const AuxiliaresModal = ({
      isOpen,
      onClose,
      onSave,
      editingAuxiliar = null,
}) => {
      const {
            formData,
            errors,
            isSubmitting,
            handleLetterChange,
            handleNombreChange,
            handleSubmit,
            handleClose,
            isFormValid
      } = useAuxiliaresModal(isOpen, editingAuxiliar, onSave, onClose);

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <ModalHeader
                              title={editingAuxiliar ? "Editar Auxiliar Contable" : "Crear Auxiliar Contable"}
                              icon={PiPersonSimpleCircleFill}
                        />

                        <div className="modal-form">
                              {!editingAuxiliar && <div className="input-group">
                                    <label htmlFor="auxiliar" className="input-label">
                                          Auxiliar *
                                    </label>
                                    <div className="auxiliar_inputs_container">
                                          <input
                                                type="text"
                                                id="auxiliar-letter"
                                                value={formData.auxiliar.replace(/[^A-Z]/g, '') ?? ""}
                                                onChange={handleLetterChange}
                                                className={`modal-input auxiliar_letter_input ${errors.auxiliar ? 'error' : ''}`}
                                                placeholder="A"
                                          />
                                    </div>
                                    {errors.auxiliar && (
                                          <div className="error-message">
                                                {errors.auxiliar}
                                          </div>
                                    )}
                              </div>}
                              {editingAuxiliar && <div className="input-group">
                                    <label className="input-label">
                                          Auxiliar: {editingAuxiliar.auxiliar}
                                    </label>
                              </div>}

                              <TextInput
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre"
                                    value={formData.nombre}
                                    onChange={handleNombreChange}
                                    placeholder="Ingrese el nombre del auxiliar"
                                    required
                                    hasError={!!errors.nombre}
                                    errorMessage={errors.nombre}
                              />
                        </div>

                        <ModalActions
                              onCancel={handleClose}
                              onSave={handleSubmit}
                              isFormValid={isFormValid}
                              isEditMode={!!editingAuxiliar}
                              saveText={editingAuxiliar ? "Actualizar" : "Aceptar"}
                              isLoading={isSubmitting}
                        />
                  </div>
            </div>
      );
};

export default AuxiliaresModal;
