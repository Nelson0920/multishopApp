import React from "react";
import { PiChartBarFill } from "react-icons/pi";
import { TextInput, SelectInput, ModalHeader, ModalActions } from "@components/Common/Inputs";
import { usePlanCuentasModal } from "@hooks/PlanCuentas/usePlanCuentasModal";
import "../PlanCuentas.scss";

const PlanCuentasModal = ({
      isOpen,
      onClose,
      onSave,
      editingCuenta = null,
}) => {
      const {
            formData,
            errors,
            isSubmitting,
            handleCodigoChange,
            handleNombreChange,
            handleAuxiliar1Change,
            handleAuxiliar2Change,
            handleCategoriaChange,
            handleSubmit,
            handleClose,
            isFormValid
      } = usePlanCuentasModal(isOpen, editingCuenta, onSave, onClose);

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <ModalHeader
                              title={editingCuenta ? "Editar Cuenta" : "Crear Cuenta"}
                              icon={PiChartBarFill}
                        />

                        <div className="modal-form">
                              <div className="input-group">
                                    <TextInput
                                          id="codigo"
                                          name="codigo"
                                          label="Código de Cuenta"
                                          value={formData.codigo}
                                          onChange={handleCodigoChange}
                                          placeholder="Ejemplo: 1.42.5.31"
                                          required
                                          hasError={!!errors.codigo}
                                          errorMessage={errors.codigo}
                                    />
                              </div>

                              <div className="input-group">
                                    <TextInput
                                          id="nombre"
                                          name="nombre"
                                          label="Nombre de la Cuenta"
                                          value={formData.nombre}
                                          onChange={handleNombreChange}
                                          placeholder="Ejemplo: Cuentas por pagar"
                                          required
                                          hasError={!!errors.nombre}
                                          errorMessage={errors.nombre}
                                    />
                              </div>

                              <div className="input-group">
                                    <TextInput
                                          id="auxiliar1"
                                          name="auxiliar1"
                                          label="Auxiliar 1 (Opcional)"
                                          value={formData.auxiliar1}
                                          onChange={handleAuxiliar1Change}
                                          placeholder="Ejemplo: M, N, Q"
                                          hasError={!!errors.auxiliar1}
                                          errorMessage={errors.auxiliar1}
                                    />
                              </div>

                              <div className="input-group">
                                    <TextInput
                                          id="auxiliar2"
                                          name="auxiliar2"
                                          label="Auxiliar 2 (Opcional)"
                                          value={formData.auxiliar2}
                                          onChange={handleAuxiliar2Change}
                                          placeholder="Ejemplo: A, C"
                                          hasError={!!errors.auxiliar2}
                                          errorMessage={errors.auxiliar2}
                                    />
                              </div>

                              <div className="input-group">
                                    <SelectInput
                                          id="categoria"
                                          name="categoria"
                                          label="Categoría"
                                          value={formData.categoria}
                                          onChange={handleCategoriaChange}
                                          options={[
                                                { value: 'A', label: 'Activos' },
                                                { value: 'P', label: 'Pasivos' },
                                                { value: 'O', label: 'Otros' },
                                                { value: 'G', label: 'Gasto' }
                                          ]}
                                          required
                                          className={errors.categoria ? 'error' : 'modal-input'}
                                    />
                                    {errors.categoria && (
                                          <div className="error-message">
                                                {errors.categoria}
                                          </div>
                                    )}
                              </div>
                        </div>

                        <ModalActions
                              onCancel={handleClose}
                              onSave={handleSubmit}
                              isFormValid={isFormValid}
                              isEditMode={!!editingCuenta}
                              saveText={editingCuenta ? "Actualizar" : "Aceptar"}
                              isLoading={isSubmitting}
                        />
                  </div>
            </div>
      );
};

export default PlanCuentasModal;