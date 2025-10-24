import React from "react";
import { MdAssignment } from "react-icons/md";
import { TextInput, NumberInput, ModalHeader, ModalActions } from "@components/Common/Inputs";
import { useAsignacionISRLModal } from "@hooks/AsignacionISRL/useAsignacionISRLModal";
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
      const {
            formData,
            errors,
            isSubmitting,
            isFormValid,
            handleCodeChange,
            handleNameChange,
            handlePercentageChange,
            handleAmountChange,
            handleSubmit,
            handleClose
      } = useAsignacionISRLModal(isOpen, initialData, onSave, onClose);

      const handleSave = () => {
            handleSubmit();
      };

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <ModalHeader
                              title={isEditMode ? "Editar Concepto de Retención ISRL" : "Crear Concepto de Retención ISRL"}
                              icon={MdAssignment}
                        />

                        <div className="modal-form">
                              <TextInput
                                    id="code"
                                    name="code"
                                    label="Código"
                                    value={formData.code}
                                    onChange={handleCodeChange}
                                    placeholder="Ejemplo: ISRL001"
                                    error={errors.code}
                                    required
                              />

                              <TextInput
                                    id="name"
                                    name="name"
                                    label="Concepto"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    placeholder="Ejemplo: Servicios Profesionales"
                                    error={errors.name}
                                    required
                              />

                              <NumberInput
                                    id="percentage_pn"
                                    name="percentage_pn"
                                    label="Porcentaje Persona Natural"
                                    value={formData.percentage_pn}
                                    onChange={handlePercentageChange}
                                    placeholder="Ejemplo: 10"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    error={errors.percentage_pn}
                                    required
                              />

                              <NumberInput
                                    id="percentage_pj"
                                    name="percentage_pj"
                                    label="Porcentaje Persona Jurídica"
                                    value={formData.percentage_pj}
                                    onChange={handlePercentageChange}
                                    placeholder="Ejemplo: 5"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    error={errors.percentage_pj}
                                    required
                              />

                              <NumberInput
                                    id="subtrahend_amount_pn"
                                    name="subtrahend_amount_pn"
                                    label="Monto Sustraendo Persona Natural"
                                    value={formData.subtrahend_amount_pn}
                                    onChange={handleAmountChange}
                                    placeholder="Ejemplo: 50000"
                                    min="0"
                                    error={errors.subtrahend_amount_pn}
                                    required
                              />

                              <NumberInput
                                    id="subtrahend_amount_pj"
                                    name="subtrahend_amount_pj"
                                    label="Monto Sustraendo Persona Jurídica (Opcional)"
                                    value={formData.subtrahend_amount_pj}
                                    onChange={handleAmountChange}
                                    placeholder="Ejemplo: 100000"
                                    min="0"
                                    error={errors.subtrahend_amount_pj}
                              />
                        </div>

                        <ModalActions
                              onCancel={handleClose}
                              onSave={handleSave}
                              isFormValid={isFormValid}
                              isEditMode={isEditMode}
                              isLoading={isSubmitting}
                        />
                  </div>
            </div>
      );
};

export default AsignacionISRLModal;
