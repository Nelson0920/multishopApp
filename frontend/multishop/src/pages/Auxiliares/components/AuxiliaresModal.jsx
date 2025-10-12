import React, { useState } from "react";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import "../Auxiliares.scss";

const AuxiliaresModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            auxiliar: "",
            nombre: ""
      }
}) => {
      const [formData, setFormData] = useState(initialData);

      const handleLetterChange = (e) => {
            const value = e.target.value.toUpperCase();
            const letter = value.replace(/[^A-Z]/g, '').substring(value.length - 1, value.length);
            const numericValue = parseInt(formData.auxiliar.replace(/[^0-9]/g, '')) || 0;
            const formattedNumbers = numericValue.toString().padStart(7, '0');
            setFormData(prev => ({
                  ...prev,
                  auxiliar: letter + formattedNumbers
            }));
      };

      const handleNumberChange = (e) => {
            const numbers = e.target.value.replace(/[^0-9]/g, '');
            if (numbers > 9999999) return;
            const numericValue = parseInt(numbers) || 0;
            const letter = formData.auxiliar.replace(/[^A-Z]/g, '').substring(0, 1);
            const formattedNumbers = numericValue.toString().padStart(7, '0');
            setFormData(prev => ({
                  ...prev,
                  auxiliar: letter + formattedNumbers
            }));
      };

      const handleNombreChange = (e) => {
            const value = e.target.value.toUpperCase();
            const name = value.replace(/[^A-Z ]/g, '');
            setFormData(prev => ({
                  ...prev,
                  nombre: name
            }));
      };

      const isFormValid = () => {
            return formData.auxiliar.trim() && formData.nombre.trim();
      };

      const handleSave = () => {
            if (!isFormValid()) return;
            onSave(formData);
      };

      const handleClose = () => {
            setFormData(initialData);
            onClose();
      };

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                              <h2 className="modal-title">
                                    {isEditMode ? "Editar Auxiliar Contable" : "Crear Auxiliar Contable"}
                              </h2>
                              <div className="modal-icon">
                                    <PiPersonSimpleCircleFill size={24} color="#36aad4" />
                              </div>
                        </div>

                        <div className="modal-form">
                              <div className="input-group">
                                    <label htmlFor="auxiliar" className="input-label">
                                          Auxiliar *
                                    </label>
                                    <div className="auxiliar_inputs_container">
                                          <input
                                                type="text"
                                                id="auxiliar-letter"
                                                value={formData.auxiliar.replace(/[^A-Z]/g, '')}
                                                onChange={handleLetterChange}
                                                className="modal-input auxiliar_letter_input"
                                                placeholder="A"
                                          />
                                          <input
                                                type="text"
                                                id="auxiliar-number"
                                                value={formData.auxiliar.replace(/[^0-9]/g, '')}
                                                onChange={handleNumberChange}
                                                className="modal-input auxiliar_number_input"
                                                placeholder="0000001"
                                          />
                                    </div>
                                    <div className="auxiliar_preview">
                                          {formData.auxiliar ? formData.auxiliar : 'Ejemplo: A0000001'}
                                    </div>
                              </div>

                              <div className="input-group">
                                    <label htmlFor="nombre" className="input-label">
                                          Nombre *
                                    </label>
                                    <input
                                          type="text"
                                          id="nombre"
                                          name="nombre"
                                          value={formData.nombre}
                                          onChange={handleNombreChange}
                                          className="modal-input"
                                          placeholder="Ingrese el nombre del auxiliar"
                                    />
                              </div>
                        </div>

                        <div className="modal-actions">
                              <button
                                    className="btn-cancel"
                                    onClick={handleClose}
                              >
                                    Cancelar
                              </button>
                              <button
                                    className="btn-accept"
                                    onClick={handleSave}
                                    disabled={!isFormValid()}
                              >
                                    {isEditMode ? "Actualizar" : "Aceptar"}
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default AuxiliaresModal;
