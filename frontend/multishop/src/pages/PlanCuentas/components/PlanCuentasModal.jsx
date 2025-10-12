import React, { useState } from "react";
import { MdAccountBalance } from "react-icons/md";

const PlanCuentasModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            codigo: "",
            nombre: "",
            auxiliarContable1: "",
            auxiliarContable2: "",
            categoria: ""
      }
}) => {
      const [formData, setFormData] = useState(initialData);

      const categorias = ["otros", "activos", "pasivos", "gasto"];

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));
      };

      const handleCodigoChange = (e) => {
            const value = e.target.value;
            let digits = value.replace(/[^0-9]/g, '');

            if (digits.length > 6) {
                  digits = digits.slice(0, 6);
            }

            let formattedValue = '';
            if (digits.length > 0) {
                  formattedValue = digits.charAt(0);
                  if (digits.length > 1) {
                        formattedValue += '.' + digits.slice(1, 3);
                        if (digits.length > 3) {
                              formattedValue += '.' + digits.charAt(3);
                              if (digits.length > 4) {
                                    formattedValue += '.' + digits.slice(4, 6);
                              }
                        }
                  }
            }

            setFormData(prev => ({
                  ...prev,
                  codigo: formattedValue
            }));
      };

      const handleAuxiliarChange = (field) => (e) => {
            const value = e.target.value.toUpperCase();
            const filteredValue = value.replace(/[^A-Z]/g, '');
            const withCommas = filteredValue.replace(/([A-Z])/g, '$1,');
            const finalValue = withCommas.slice(0, -1);

            setFormData(prev => ({
                  ...prev,
                  [field]: finalValue
            }));
      };

      const isFormValid = () => {
            const codigoPattern = /^\d\.\d{2}\.\d\.\d{2}$/;
            const isCodigoValid = codigoPattern.test(formData.codigo.trim());
            return isCodigoValid && formData.nombre.trim() && formData.categoria;
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
                                    {isEditMode ? "Editar Plan de Cuentas" : "Crear Plan de Cuentas"}
                              </h2>
                              <div className="modal-icon">
                                    <MdAccountBalance size={24} color="#36aad4" />
                              </div>
                        </div>

                        <div className="modal-form">
                              <div className="input-group">
                                    <label htmlFor="codigo" className="input-label">
                                          Código *
                                    </label>
                                    <input
                                          type="text"
                                          id="codigo"
                                          name="codigo"
                                          value={formData.codigo}
                                          onChange={handleCodigoChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 1.01.1.01"
                                          maxLength={9}
                                    />
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
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ingrese el nombre de la cuenta"
                                          maxLength={100}
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="auxiliarContable1" className="input-label">
                                          Reglas de Auxiliar Contable 1
                                    </label>
                                    <input
                                          type="text"
                                          id="auxiliarContable1"
                                          name="auxiliarContable1"
                                          value={formData.auxiliarContable1}
                                          onChange={handleAuxiliarChange('auxiliarContable1')}
                                          className="modal-input"
                                          placeholder="Solo letras permitidas"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="auxiliarContable2" className="input-label">
                                          Reglas de Auxiliar Contable 2
                                    </label>
                                    <input
                                          type="text"
                                          id="auxiliarContable2"
                                          name="auxiliarContable2"
                                          value={formData.auxiliarContable2}
                                          onChange={handleAuxiliarChange('auxiliarContable2')}
                                          className="modal-input"
                                          placeholder="Solo letras permitidas"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="categoria" className="input-label">
                                          Categoría *
                                    </label>
                                    <select
                                          id="categoria"
                                          name="categoria"
                                          value={formData.categoria}
                                          onChange={handleInputChange}
                                          className="modal-select"
                                    >
                                          <option value="">Seleccione una categoría</option>
                                          {categorias.map((cat) => (
                                                <option key={cat} value={cat}>
                                                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </option>
                                          ))}
                                    </select>
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

export default PlanCuentasModal;
