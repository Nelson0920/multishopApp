import React, { useState } from "react";
import { MdCategory, MdSearch } from "react-icons/md";
import {
      TextInput,
      NumberInput,
      SearchInput,
      AuxiliarInput,
      AuxiliarRules,
      AccountGroup,
      ModalHeader,
      ModalActions
} from "@components/Common/Inputs";
import "../Categorias.scss";
import PLAN_CUENTAS from "@mocks/PlanCuentas.json";
import AUXILIARES from "@mocks/Auxiliares.json";
import CategoriasCPOAdapter from "@business/adapters/CategoriasCPOAdapter";

const CategoriasModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      editingCategoria = null,
      isLoading = false
}) => {
      const [formData, setFormData] = useState({
            name: "",
            credit_limit: "",
            credit_terms: "",
            discount_percentage: "",
            plan_cuentas_id: "",
            auxiliary1_id: "",
            auxiliary2_id: "",
            createdAt: "",
            deadline_day: ""
      });
      const [currentView, setCurrentView] = useState('form');
      const [listType, setListType] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      React.useEffect(() => {
            if (isOpen) {
                  if (editingCategoria) {
                        setFormData({
                              id: editingCategoria.id || '',
                              name: editingCategoria.name || '',
                              credit_limit: editingCategoria.credit_limit || '',
                              credit_terms: editingCategoria.credit_terms || '',
                              discount_percentage: editingCategoria.discount_percentage || '',
                              plan_cuentas_id: editingCategoria.plan_cuentas_id || '',
                              auxiliary1_id: editingCategoria.auxiliary1_id || '',
                              auxiliary2_id: editingCategoria.auxiliary2_id || '',
                              createdAt: editingCategoria.createdAt || '',
                              deadline_day: editingCategoria.deadline_day || ''
                        });
                  } else {
                        setFormData({
                              name: "",
                              credit_limit: "",
                              credit_terms: "",
                              discount_percentage: "",
                              plan_cuentas_id: "",
                              auxiliary1_id: "",
                              auxiliary2_id: "",
                              createdAt: "",
                              deadline_day: ""
                        });
                  }
            }
      }, [isOpen, editingCategoria]);

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

            const formDataForAdapter = {
                  id: formData.id || undefined,
                  nombre: formData.name,
                  descuento: parseFloat(formData.discount_percentage) || 0,
                  ganancia: 0,
                  gestionBanda: false
            };

            onSave(formDataForAdapter);
      };

      const handleClose = () => {
            setFormData({
                  name: "",
                  credit_limit: "",
                  credit_terms: "",
                  discount_percentage: "",
                  plan_cuentas_id: "",
                  auxiliary1_id: "",
                  auxiliary2_id: "",
                  createdAt: "",
                  deadline_day: ""
            });
            setCurrentView('form');
            setListType(null);
            setSearchTerm("");
            onClose();
      };

      const isFormLoading = isLoading;

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className={`modal-container ${currentView === 'list' ? 'large-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                        {currentView === 'form' ? (
                              <>
                                    <ModalHeader
                                          title={isEditMode ? "Editar Categoría" : "Crear Categoría"}
                                          icon={MdCategory}
                                    />

                                    <div className="modal-form">
                                          <TextInput
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Ingrese el nombre de la categoría"
                                                required
                                          />

                                          <NumberInput
                                                id="credit_limit"
                                                name="credit_limit"
                                                label="Límite de Crédito"
                                                value={formData.credit_limit}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 50000"
                                                min="0"
                                                required
                                          />

                                          <TextInput
                                                id="credit_terms"
                                                name="credit_terms"
                                                label="Términos de Crédito"
                                                value={formData.credit_terms}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 30 días"
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

                                          {/* Grupo Cuenta Contable */}
                                          <AccountGroup>
                                                <SearchInput
                                                      id="plan_cuentas_id"
                                                      name="plan_cuentas_id"
                                                      label="Plan de Cuentas"
                                                      value={getSelectedText('plan_cuentas_id')}
                                                      onClick={() => handleOpenList('plan_cuentas', 'plan_cuentas_id')}
                                                      placeholder="Seleccionar plan de cuentas"
                                                />

                                                <AuxiliarInput
                                                      id="auxiliary1_id"
                                                      name="auxiliary1_id"
                                                      label="Auxiliar 1"
                                                      value={getSelectedText('auxiliary1_id')}
                                                      onClick={() => handleOpenList('auxiliares', 'auxiliary1_id')}
                                                      disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                      auxiliarNumber={1}
                                                />
                                                <AuxiliarRules rules={getAuxiliarRules('plan_cuentas_id')} />

                                                <AuxiliarInput
                                                      id="auxiliary2_id"
                                                      name="auxiliary2_id"
                                                      label="Auxiliar 2"
                                                      value={getSelectedText('auxiliary2_id')}
                                                      onClick={() => handleOpenList('auxiliares', 'auxiliary2_id')}
                                                      disabled={!isAuxiliarEnabled('plan_cuentas_id')}
                                                      auxiliarNumber={2}
                                                />
                                                <AuxiliarRules rules={getAuxiliarRules('plan_cuentas_id')} />
                                          </AccountGroup>

                                          <NumberInput
                                                id="deadline_day"
                                                name="deadline_day"
                                                label="Días de Vigencia (máximo 5 años)"
                                                value={formData.deadline_day}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 365"
                                                min="1"
                                                max="1825"
                                                required
                                          />
                                    </div>

                                    <ModalActions
                                          onCancel={handleClose}
                                          onSave={handleSave}
                                          isFormValid={isFormValid()}
                                          isEditMode={isEditMode}
                                          isLoading={isFormLoading}
                                    />
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

                                    <ModalActions
                                          onCancel={handleCloseList}
                                          cancelText="Volver"
                                          isFormValid={true}
                                          isEditMode={false}
                                    />
                              </>
                        )}
                  </div>
            </div>
      );
};

export default CategoriasModal;
