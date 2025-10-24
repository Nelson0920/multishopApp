import React, { useState } from "react";
import { MdPayment } from "react-icons/md";
import { NumberInput, ModalHeader, ModalActions } from "@components/Common/Inputs";
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
                        <ModalHeader
                              title={isEditMode ? "Editar Condición de Pago" : "Crear Condición de Pago"}
                              icon={MdPayment}
                        />

                        <div className="modal-form">
                              <NumberInput
                                    id="days"
                                    name="days"
                                    label="Días"
                                    value={formData.days}
                                    onChange={handleInputChange}
                                    placeholder="Ejemplo: 30"
                                    min="0"
                                    required
                              />

                              <NumberInput
                                    id="discount_percentage"
                                    name="discount_percentage"
                                    label="Porcentaje de Descuento"
                                    value={formData.discount_percentage}
                                    onChange={handleInputChange}
                                    placeholder="Ejemplo: 5"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    required
                              />
                        </div>

                        <ModalActions
                              onCancel={handleClose}
                              onSave={handleSave}
                              isFormValid={isFormValid()}
                              isEditMode={isEditMode}
                        />
                  </div>
            </div>
      );
};

export default CondicionesPagoModal;
