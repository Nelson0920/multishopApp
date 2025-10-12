import React, { useState } from "react";
import { MdAssignment } from "react-icons/md";
import "../AsignacionISRL.scss";

const AsignacionISRLModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            code: "",
            name: "",
            percentage_pn: "",
            percentage_pj: "",
            subtrahend_amount_pn: "",
            subtrahend_amount_pj: ""
      }
}) => {
      const [formData, setFormData] = useState(initialData);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));
      };

      const isFormValid = () => {
            return formData.code.trim() &&
                  formData.name.trim() &&
                  formData.percentage_pn !== "" &&
                  formData.percentage_pj !== "" &&
                  formData.subtrahend_amount_pn !== "" &&
                  formData.percentage_pn >= 0 &&
                  formData.percentage_pj >= 0 &&
                  formData.subtrahend_amount_pn >= 0 &&
                  (formData.subtrahend_amount_pj === "" || formData.subtrahend_amount_pj >= 0);
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
                                    {isEditMode ? "Editar Concepto de Retención ISRL" : "Crear Concepto de Retención ISRL"}
                              </h2>
                              <div className="modal-icon">
                                    <MdAssignment size={24} color="#36aad4" />
                              </div>
                        </div>

                        <div className="modal-form">
                              <div className="input-group">
                                    <label htmlFor="code" className="input-label">
                                          Código *
                                    </label>
                                    <input
                                          type="text"
                                          id="code"
                                          name="code"
                                          value={formData.code}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: ISRL001"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="name" className="input-label">
                                          Concepto *
                                    </label>
                                    <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: Servicios Profesionales"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="percentage_pn" className="input-label">
                                          Porcentaje Persona Natural *
                                    </label>
                                    <input
                                          type="number"
                                          id="percentage_pn"
                                          name="percentage_pn"
                                          value={formData.percentage_pn}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 10"
                                          min="0"
                                          max="100"
                                          step="0.1"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="percentage_pj" className="input-label">
                                          Porcentaje Persona Jurídica *
                                    </label>
                                    <input
                                          type="number"
                                          id="percentage_pj"
                                          name="percentage_pj"
                                          value={formData.percentage_pj}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 5"
                                          min="0"
                                          max="100"
                                          step="0.1"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="subtrahend_amount_pn" className="input-label">
                                          Monto Sustraendo Persona Natural *
                                    </label>
                                    <input
                                          type="number"
                                          id="subtrahend_amount_pn"
                                          name="subtrahend_amount_pn"
                                          value={formData.subtrahend_amount_pn}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 50000"
                                          min="0"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="subtrahend_amount_pj" className="input-label">
                                          Monto Sustraendo Persona Jurídica (Opcional)
                                    </label>
                                    <input
                                          type="number"
                                          id="subtrahend_amount_pj"
                                          name="subtrahend_amount_pj"
                                          value={formData.subtrahend_amount_pj}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 100000"
                                          min="0"
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
                                    {isEditMode ? "Actualizar" : "Crear"}
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default AsignacionISRLModal;
