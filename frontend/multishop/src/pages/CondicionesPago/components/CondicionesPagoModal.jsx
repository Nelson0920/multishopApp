import React, { useState } from "react";
import { MdPayment } from "react-icons/md";
import "../CondicionesPago.scss";

const CondicionesPagoModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            days: "",
            discount_percentage: ""
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
            return formData.days !== "" &&
                  formData.discount_percentage !== "" &&
                  formData.days >= 0 &&
                  formData.discount_percentage >= 0 &&
                  formData.discount_percentage <= 100;
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
                                    {isEditMode ? "Editar Condición de Pago" : "Crear Condición de Pago"}
                              </h2>
                              <div className="modal-icon">
                                    <MdPayment size={24} color="#36aad4" />
                              </div>
                        </div>

                        <div className="modal-form">
                              <div className="input-group">
                                    <label htmlFor="days" className="input-label">
                                          Días *
                                    </label>
                                    <input
                                          type="number"
                                          id="days"
                                          name="days"
                                          value={formData.days}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 30"
                                          min="0"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="discount_percentage" className="input-label">
                                          Porcentaje de Descuento *
                                    </label>
                                    <input
                                          type="number"
                                          id="discount_percentage"
                                          name="discount_percentage"
                                          value={formData.discount_percentage}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 5"
                                          min="0"
                                          max="100"
                                          step="0.1"
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

export default CondicionesPagoModal;
