import React, { useState } from "react";
import { MdCategory, MdSearch, MdClose, MdAccountTree } from "react-icons/md";
import "../Categorias.scss";
import PLAN_CUENTAS from "@mocks/PlanCuentas.json";
import AUXILIARES from "@mocks/Auxiliares.json";

const CategoriasModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            name: "",
            credit_limit: "",
            credit_terms: "",
            discount_percentage: "",
            plan_cuentas_id: "",
            auxiliary1_id: "",
            auxiliary2_id: "",
            createdAt: "",
            deadline_day: ""
      }
}) => {
      const [formData, setFormData] = useState(initialData);
      const [currentView, setCurrentView] = useState('form');
      const [listType, setListType] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));
      };

      const handleOpenList = (type, fieldName) => {
            setCurrentView('list');
            setListType(type);
            setSearchTerm("");
            setFormData(prev => ({ ...prev, _currentField: fieldName }));
      };

      const handleCloseList = () => {
            setCurrentView('form');
            setListType(null);
            setSearchTerm("");
      };

      const handleSelectItem = (item) => {
            const fieldName = formData._currentField;
            if (fieldName) {
                  setFormData(prev => ({
                        ...prev,
                        [fieldName]: item.id || item.auxiliar || item.name,
                        _currentField: undefined
                  }));
            }
            handleCloseList();
      };

      const getFilteredData = () => {
            if (!listType) return [];

            let data = [];
            switch (listType) {
                  case 'plan_cuentas':
                        data = PLAN_CUENTAS;
                        break;
                  case 'auxiliares':
                        data = AUXILIARES;
                        break;
                  default:
                        return [];
            }

            if (!searchTerm.trim()) return data;

            return data.filter(item => {
                  if (listType === 'plan_cuentas') {
                        return item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
                  } else if (listType === 'auxiliares') {
                        return item.auxiliar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
                  }
                  return true;
            });
      };

      const getSelectedText = (fieldName) => {
            const value = formData[fieldName];
            if (!value) return "Seleccionar...";

            if (fieldName === 'plan_cuentas_id') {
                  const cuenta = PLAN_CUENTAS.find(c => c.id === value);
                  return cuenta ? `${cuenta.codigo} - ${cuenta.nombre}` : "Seleccionar...";
            }

            if (fieldName === 'auxiliary1_id' || fieldName === 'auxiliary2_id') {
                  const auxiliar = AUXILIARES.find(a => a.auxiliar === value);
                  return auxiliar ? `${auxiliar.auxiliar} - ${auxiliar.nombre}` : "Seleccionar...";
            }

            return "Seleccionar...";
      };

      const getAuxiliarRules = (cuentaFieldName) => {
            const cuentaId = formData[cuentaFieldName];
            if (!cuentaId) return "Seleccione primero la cuenta";

            const cuenta = PLAN_CUENTAS.find(c => c.id === cuentaId);
            if (!cuenta) return "Cuenta no encontrada";

            const letras = cuenta.auxiliarContable1 || "";
            return letras ? `Reglas de auxiliar: ${letras}` : "Sin reglas definidas";
      };

      const isAuxiliarEnabled = (cuentaFieldName) => {
            return !!formData[cuentaFieldName];
      };

      const isFormValid = () => {
            return formData.name.trim() &&
                  formData.credit_limit &&
                  formData.credit_terms.trim() &&
                  formData.discount_percentage &&
                  formData.deadline_day &&
                  formData.deadline_day <= 1825;
      };

      const handleSave = () => {
            if (!isFormValid()) return;
            onSave(formData);
      };

      const handleClose = () => {
            setFormData(initialData);
            setCurrentView('form');
            setListType(null);
            setSearchTerm("");
            onClose();
      };

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className={`modal-container ${currentView === 'list' ? 'large-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                        {currentView === 'form' ? (
                              <>
                                    <div className="modal-header">
                                          <h2 className="modal-title">
                                                {isEditMode ? "Editar Categoría CPO" : "Crear Categoría CPO"}
                                          </h2>
                                          <div className="modal-icon">
                                                <MdCategory size={24} color="#36aad4" />
                                          </div>
                                    </div>

                                    <div className="modal-form">
                                          <div className="input-group">
                                                <label htmlFor="name" className="input-label">
                                                      Nombre *
                                                </label>
                                                <input
                                                      type="text"
                                                      id="name"
                                                      name="name"
                                                      value={formData.name}
                                                      onChange={handleInputChange}
                                                      className="modal-input"
                                                      placeholder="Ingrese el nombre de la categoría CPO"
                                                />
                                          </div>

                                          <div className="input-group">
                                                <label htmlFor="credit_limit" className="input-label">
                                                      Límite de Crédito *
                                                </label>
                                                <input
                                                      type="number"
                                                      id="credit_limit"
                                                      name="credit_limit"
                                                      value={formData.credit_limit}
                                                      onChange={handleInputChange}
                                                      className="modal-input"
                                                      placeholder="Ejemplo: 50000"
                                                      min="0"
                                                />
                                          </div>

                                          <div className="input-group">
                                                <label htmlFor="credit_terms" className="input-label">
                                                      Términos de Crédito *
                                                </label>
                                                <input
                                                      type="text"
                                                      id="credit_terms"
                                                      name="credit_terms"
                                                      value={formData.credit_terms}
                                                      onChange={handleInputChange}
                                                      className="modal-input"
                                                      placeholder="Ejemplo: 30 días"
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

                                          {/* Grupo Cuenta Contable */}
                                          <div className="account-group">
                                                <div className="input-group">
                                                      <label htmlFor="plan_cuentas_id" className="input-label">
                                                            Plan de Cuentas
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="plan_cuentas_id"
                                                                  name="plan_cuentas_id"
                                                                  value={getSelectedText('plan_cuentas_id')}
                                                                  readOnly
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar plan de cuentas"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'plan_cuentas_id')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'plan_cuentas_id')}
                                                                  title="Buscar plan de cuentas"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>

                                                <div className="input-group auxiliar-group">
                                                      <label htmlFor="auxiliary1_id" className="input-label">
                                                            <MdAccountTree size={16} className="auxiliar-icon" />
                                                            Auxiliar 1
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="auxiliary1_id"
                                                                  name="auxiliary1_id"
                                                                  value={getSelectedText('auxiliary1_id')}
                                                                  readOnly
                                                                  disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar auxiliar 1"
                                                                  onClick={() => isAuxiliarEnabled('plan_cuentas_id') && handleOpenList('auxiliares', 'auxiliary1_id')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                                  onClick={() => handleOpenList('auxiliares', 'auxiliary1_id')}
                                                                  title="Buscar auxiliar 1"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="auxiliar-rules">
                                                      {getAuxiliarRules('plan_cuentas_id')}
                                                </div>

                                                <div className="input-group auxiliar-group">
                                                      <label htmlFor="auxiliary2_id" className="input-label">
                                                            <MdAccountTree size={16} className="auxiliar-icon" />
                                                            Auxiliar 2
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="auxiliary2_id"
                                                                  name="auxiliary2_id"
                                                                  value={getSelectedText('auxiliary2_id')}
                                                                  readOnly
                                                                  disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar auxiliar 2"
                                                                  onClick={() => isAuxiliarEnabled('plan_cuentas_id') && handleOpenList('auxiliares', 'auxiliary2_id')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                                  onClick={() => handleOpenList('auxiliares', 'auxiliary2_id')}
                                                                  title="Buscar auxiliar 2"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="auxiliar-rules">
                                                      {getAuxiliarRules('plan_cuentas_id')}
                                                </div>
                                          </div>

                                          <div className="input-group">
                                                <label htmlFor="deadline_day" className="input-label">
                                                      Días de Vigencia * (máximo 5 años)
                                                </label>
                                                <input
                                                      type="number"
                                                      id="deadline_day"
                                                      name="deadline_day"
                                                      value={formData.deadline_day}
                                                      onChange={handleInputChange}
                                                      className="modal-input"
                                                      placeholder="Ejemplo: 365"
                                                      min="1"
                                                      max="1825"
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
                              </>
                        ) : (
                              <>
                                    <div className="modal-header">
                                          <h2 className="modal-title">
                                                {listType === 'plan_cuentas' ? 'Seleccionar Plan de Cuentas' :
                                                      'Seleccionar Auxiliar'}
                                          </h2>
                                          <div className="modal-icon">
                                                <MdSearch size={24} color="#36aad4" />
                                          </div>
                                    </div>

                                    <div className="filter_container">
                                          <label className="input_label">Buscar:</label>
                                          <div className="filter_input_wrapper">
                                                <input
                                                      type="text"
                                                      value={searchTerm}
                                                      onChange={(e) => setSearchTerm(e.target.value)}
                                                      className="modal_input"
                                                      placeholder={
                                                            listType === 'plan_cuentas' ? 'Buscar por código o nombre...' :
                                                                  'Buscar por código o nombre...'
                                                      }
                                                />
                                                <div className="filter_count">
                                                      {getFilteredData().length} resultados
                                                </div>
                                          </div>
                                    </div>

                                    <div className="codes_list">
                                          {getFilteredData().length === 0 ? (
                                                <div className="no_results">
                                                      No se encontraron resultados
                                                </div>
                                          ) : (
                                                getFilteredData().map((item, index) => (
                                                      <div
                                                            key={index}
                                                            className="code_item"
                                                            onClick={() => handleSelectItem(item)}
                                                      >
                                                            {listType === 'plan_cuentas' ? (
                                                                  <>
                                                                        <div className="code_item_code">{item.codigo}</div>
                                                                        <div className="code_item_name">{item.nombre}</div>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <div className="code_item_code">{item.auxiliar}</div>
                                                                        <div className="code_item_name">{item.nombre}</div>
                                                                  </>
                                                            )}
                                                      </div>
                                                ))
                                          )}
                                    </div>

                                    <div className="modal-actions">
                                          <button
                                                className="btn-cancel"
                                                onClick={handleCloseList}
                                          >
                                                Volver
                                          </button>
                                    </div>
                              </>
                        )}
                  </div>
            </div>
      );
};

export default CategoriasModal;
