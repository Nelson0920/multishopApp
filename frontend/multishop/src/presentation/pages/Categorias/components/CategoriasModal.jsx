import React, { useState } from "react";
import { MdCategory, MdSearch, MdClose, MdAccountTree } from "react-icons/md";
import {
      TextInput,
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
import CPO_DATA from "@mocks/CPO.json";

const CategoriasModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            nombre: "",
            margenGanancia: "",
            porcentajeComision: "",
            cuentaVentas: "",
            cuentaCompras: "",
            cuentaConsumos: "",
            cuentaDevCompras: "",
            cuentaIVA: "",
            auxiliarCompras: "",
            auxiliarConsumos: "",
            auxiliarDevCompras: "",
            auxiliarIVA: "",
            auxiliarIVA2: ""
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
                  case 'cpo':
                        data = CPO_DATA;
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
                  } else if (listType === 'cpo') {
                        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.rif.toLowerCase().includes(searchTerm.toLowerCase());
                  }
                  return true;
            });
      };

      const getSelectedText = (fieldName) => {
            const value = formData[fieldName];
            if (!value) return "Seleccionar...";

            if (fieldName.includes('cuenta')) {
                  const cuenta = PLAN_CUENTAS.find(c => c.id === value);
                  return cuenta ? `${cuenta.codigo} - ${cuenta.nombre}` : "Seleccionar...";
            }

            if (fieldName.includes('auxiliar')) {
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
            return formData.nombre.trim() &&
                  formData.margenGanancia.trim() &&
                  formData.porcentajeComision.trim();
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
                                    <ModalHeader
                                          title={isEditMode ? "Editar Categoría" : "Crear Categoría"}
                                          icon={MdCategory}
                                    />

                                    <div className="modal-form">
                                          <TextInput
                                                id="nombre"
                                                name="nombre"
                                                label="Nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                placeholder="Ingrese el nombre de la categoría"
                                                required
                                          />

                                          <TextInput
                                                id="margenGanancia"
                                                name="margenGanancia"
                                                label="Margen de Ganancia"
                                                value={formData.margenGanancia}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 25%"
                                                required
                                          />

                                          <TextInput
                                                id="porcentajeComision"
                                                name="porcentajeComision"
                                                label="Porcentaje de Comisión"
                                                value={formData.porcentajeComision}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 8%"
                                                required
                                          />

                                          {/* Grupo Ventas */}
                                          <AccountGroup>
                                                <SearchInput
                                                      id="cuentaVentas"
                                                      name="cuentaVentas"
                                                      label="Cuenta de Ventas"
                                                      value={getSelectedText('cuentaVentas')}
                                                      onClick={() => handleOpenList('plan_cuentas', 'cuentaVentas')}
                                                      placeholder="Seleccionar cuenta de ventas"
                                                />
                                          </AccountGroup>

                                          {/* Grupo Compras */}
                                          <AccountGroup>
                                                <SearchInput
                                                      id="cuentaCompras"
                                                      name="cuentaCompras"
                                                      label="Cuenta de Compras"
                                                      value={getSelectedText('cuentaCompras')}
                                                      onClick={() => handleOpenList('plan_cuentas', 'cuentaCompras')}
                                                      placeholder="Seleccionar cuenta de compras"
                                                />
                                                <AuxiliarInput
                                                      id="auxiliarCompras"
                                                      name="auxiliarCompras"
                                                      label="Auxiliar 2"
                                                      value={getSelectedText('auxiliarCompras')}
                                                      onClick={() => handleOpenList('auxiliares', 'auxiliarCompras')}
                                                      disabled={!isAuxiliarEnabled('cuentaCompras')}
                                                      auxiliarNumber={2}
                                                />
                                                <AuxiliarRules rules={getAuxiliarRules('cuentaCompras')} />
                                          </AccountGroup>

                                          {/* Grupo Consumos */}
                                          <AccountGroup>
                                                <SearchInput
                                                      id="cuentaConsumos"
                                                      name="cuentaConsumos"
                                                      label="Cuenta de Consumos"
                                                      value={getSelectedText('cuentaConsumos')}
                                                      onClick={() => handleOpenList('plan_cuentas', 'cuentaConsumos')}
                                                      placeholder="Seleccionar cuenta de consumos"
                                                />
                                                <AuxiliarInput
                                                      id="auxiliarConsumos"
                                                      name="auxiliarConsumos"
                                                      label="Auxiliar 1"
                                                      value={getSelectedText('auxiliarConsumos')}
                                                      onClick={() => handleOpenList('auxiliares', 'auxiliarConsumos')}
                                                      disabled={!isAuxiliarEnabled('cuentaConsumos')}
                                                      auxiliarNumber={1}
                                                />
                                                <AuxiliarRules rules={getAuxiliarRules('cuentaConsumos')} />
                                          </AccountGroup>

                                          {/* Grupo Devoluciones en Compras */}
                                          <div className="account-group">
                                                <div className="input-group">
                                                      <label htmlFor="cuentaDevCompras" className="input-label">
                                                            Cuenta de Devoluciones en Compras
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="cuentaDevCompras"
                                                                  name="cuentaDevCompras"
                                                                  value={getSelectedText('cuentaDevCompras')}
                                                                  readOnly
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar cuenta de devoluciones"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'cuentaDevCompras')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'cuentaDevCompras')}
                                                                  title="Buscar cuenta de devoluciones"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="input-group auxiliar-group">
                                                      <label htmlFor="auxiliarDevCompras" className="input-label">
                                                            <MdAccountTree size={16} className="auxiliar-icon" />
                                                            Auxiliar 2
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="auxiliarDevCompras"
                                                                  name="auxiliarDevCompras"
                                                                  value={getSelectedText('auxiliarDevCompras')}
                                                                  readOnly
                                                                  disabled={!isAuxiliarEnabled('cuentaDevCompras')}
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar auxiliar 2"
                                                                  onClick={() => isAuxiliarEnabled('cuentaDevCompras') && handleOpenList('auxiliares', 'auxiliarDevCompras')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  disabled={!isAuxiliarEnabled('cuentaDevCompras')}
                                                                  onClick={() => handleOpenList('auxiliares', 'auxiliarDevCompras')}
                                                                  title="Buscar auxiliar 2"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="auxiliar-rules">
                                                      {getAuxiliarRules('cuentaDevCompras')}
                                                </div>
                                          </div>

                                          {/* Grupo IVA */}
                                          <div className="account-group">
                                                <div className="input-group">
                                                      <label htmlFor="cuentaIVA" className="input-label">
                                                            Cuenta de IVA
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="cuentaIVA"
                                                                  name="cuentaIVA"
                                                                  value={getSelectedText('cuentaIVA')}
                                                                  readOnly
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar cuenta de IVA"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'cuentaIVA')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  onClick={() => handleOpenList('plan_cuentas', 'cuentaIVA')}
                                                                  title="Buscar cuenta de IVA"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="input-group auxiliar-group">
                                                      <label htmlFor="auxiliarIVA" className="input-label">
                                                            <MdAccountTree size={16} className="auxiliar-icon" />
                                                            Auxiliar 1
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="auxiliarIVA"
                                                                  name="auxiliarIVA"
                                                                  value={getSelectedText('auxiliarIVA')}
                                                                  readOnly
                                                                  disabled={!isAuxiliarEnabled('cuentaIVA')}
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar auxiliar 1"
                                                                  onClick={() => isAuxiliarEnabled('cuentaIVA') && handleOpenList('auxiliares', 'auxiliarIVA')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  disabled={!isAuxiliarEnabled('cuentaIVA')}
                                                                  onClick={() => handleOpenList('auxiliares', 'auxiliarIVA')}
                                                                  title="Buscar auxiliar 1"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="auxiliar-rules">
                                                      {getAuxiliarRules('cuentaIVA')}
                                                </div>
                                                <div className="input-group auxiliar-group">
                                                      <label htmlFor="auxiliarIVA2" className="input-label">
                                                            <MdAccountTree size={16} className="auxiliar-icon" />
                                                            Auxiliar 2
                                                      </label>
                                                      <div className="search_input_wrapper">
                                                            <input
                                                                  type="text"
                                                                  id="auxiliarIVA2"
                                                                  name="auxiliarIVA2"
                                                                  value={getSelectedText('auxiliarIVA2')}
                                                                  readOnly
                                                                  disabled={!isAuxiliarEnabled('cuentaIVA')}
                                                                  className="modal-input"
                                                                  placeholder="Seleccionar auxiliar 2"
                                                                  onClick={() => isAuxiliarEnabled('cuentaIVA') && handleOpenList('auxiliares', 'auxiliarIVA2')}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  disabled={!isAuxiliarEnabled('cuentaIVA')}
                                                                  onClick={() => handleOpenList('auxiliares', 'auxiliarIVA2')}
                                                                  title="Buscar auxiliar 2"
                                                            >
                                                                  <MdSearch size={16} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="auxiliar-rules">
                                                      {getAuxiliarRules('cuentaIVA')}
                                                </div>
                                          </div>
                                    </div>

                                    <ModalActions
                                          onCancel={handleClose}
                                          onSave={handleSave}
                                          isFormValid={isFormValid()}
                                          isEditMode={isEditMode}
                                    />
                              </>
                        ) : (
                              <>
                                    <div className="modal-header">
                                          <h2 className="modal-title">
                                                {listType === 'plan_cuentas' ? 'Seleccionar Cuenta Contable' :
                                                      listType === 'auxiliares' ? 'Seleccionar Auxiliar' :
                                                            'Seleccionar CPO'}
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
                                                                  listType === 'auxiliares' ? 'Buscar por código o nombre...' :
                                                                        'Buscar por nombre o RIF...'
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
                                                            ) : listType === 'auxiliares' ? (
                                                                  <>
                                                                        <div className="code_item_code">{item.auxiliar}</div>
                                                                        <div className="code_item_name">{item.nombre}</div>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <div className="code_item_code">{item.rif}</div>
                                                                        <div className="code_item_name">{item.name}</div>
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
