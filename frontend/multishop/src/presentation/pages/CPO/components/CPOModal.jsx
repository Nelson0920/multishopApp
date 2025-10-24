import React, { useState } from "react";
import { MdBusiness, MdSearch, MdAccountTree, MdAdd } from "react-icons/md";
import {
      TextInput,
      RifInput,
      TextareaInput,
      PhoneInput,
      EmailInput,
      SelectInput,
      DateInput,
      CheckboxInput,
      FormSection,
      ModalHeader,
      ModalActions
} from "@components/Common/Inputs";
import AuxiliaresModal from "../../Auxiliares/components/AuxiliaresModal";
import "../CPO.scss";
import PLAN_CUENTAS from "@mocks/PlanCuentas.json";
import AUXILIARES from "@mocks/Auxiliares.json";
import CATEGORIAS_CPO from "@mocks/CategoriasCPO.json";
import CONDICIONES_PAGO from "@mocks/CondicionesPago.json";
import ASIGNACIONES_ISRL from "@mocks/AsignacionISRL.json";
import USUARIOS from "@mocks/Usuarios.json";

const CPOModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            type: "cliente",
            rif: "",
            name: "",
            gender: "",
            birthdate: "",
            name_commercial: "",
            address: "",
            address_fiscal: "",
            phone: "",
            email: "",
            observations: "",
            id_categories_clients: 99,
            id_categoria_default_c: "",
            id_categoria_default_p: "",
            id_sellers: "",
            credentials: "",
            marketing_environment: "nacional",
            id_accounting_accounts: "",
            auxiliary1: "",
            auxiliary2: "",
            bank_accounts: "",
            id_PaymentConditions: "",
            type_taxpayer: "contribuyente ordinario",
            retention_percentage_iva: 75,
            id_RetentionISLRConcepts: "",
            automatic_islr: false,
            blockade: false,
            observations_blockade: ""
      }
}) => {
      const [formData, setFormData] = useState(initialData);
      const [currentView, setCurrentView] = useState('form');
      const [listType, setListType] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      const [isAuxiliarModalOpen, setIsAuxiliarModalOpen] = useState(false);

      const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: type === 'checkbox' ? checked : value
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
                        [fieldName]: item.id || item.auxiliar || item.code,
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
                  case 'categorias':
                        data = CATEGORIAS_CPO;
                        break;
                  case 'condiciones':
                        data = CONDICIONES_PAGO;
                        break;
                  case 'isrl':
                        data = ASIGNACIONES_ISRL;
                        break;
                  case 'usuarios':
                        data = USUARIOS.filter(u => u.type_seller === "P");
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
                  } else if (listType === 'categorias') {
                        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
                  } else if (listType === 'condiciones') {
                        return item.days.toString().includes(searchTerm) ||
                              item.discount_percentage.toString().includes(searchTerm);
                  } else if (listType === 'isrl') {
                        return item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.name.toLowerCase().includes(searchTerm.toLowerCase());
                  } else if (listType === 'usuarios') {
                        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.rif.toLowerCase().includes(searchTerm.toLowerCase());
                  }
                  return true;
            });
      };

      const getSelectedText = (fieldName) => {
            const value = formData[fieldName];
            if (!value) return "Seleccionar...";

            switch (fieldName) {
                  case 'id_accounting_accounts': {
                        const cuenta = PLAN_CUENTAS.find(c => c.id === value);
                        return cuenta ? `${cuenta.codigo} - ${cuenta.nombre}` : "Seleccionar...";
                  }
                  case 'auxiliary1':
                  case 'auxiliary2': {
                        const auxiliar = AUXILIARES.find(a => a.auxiliar === value);
                        return auxiliar ? `${auxiliar.auxiliar} - ${auxiliar.nombre}` : "Seleccionar...";
                  }
                  case 'id_categories_clients':
                  case 'id_categoria_default_c':
                  case 'id_categoria_default_p': {
                        const categoria = CATEGORIAS_CPO.find(c => c.id === value);
                        return categoria ? categoria.name : "Seleccionar...";
                  }
                  case 'id_PaymentConditions': {
                        const condicion = CONDICIONES_PAGO.find(c => c.id === value);
                        return condicion ? `${condicion.days} días - ${condicion.discount_percentage}%` : "Seleccionar...";
                  }
                  case 'id_RetentionISLRConcepts': {
                        const concepto = ASIGNACIONES_ISRL.find(a => a.id === value);
                        return concepto ? `${concepto.code} - ${concepto.name}` : "Seleccionar...";
                  }
                  case 'id_sellers': {
                        const usuario = USUARIOS.find(u => u.id === value);
                        return usuario ? usuario.name : "Seleccionar...";
                  }
                  default:
                        return "Seleccionar...";
            }
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
            const baseValidation = formData.name.trim() && formData.address.trim() &&
                  formData.id_accounting_accounts && formData.auxiliary1;

            if (formData.type === "cliente") {
                  return baseValidation && formData.gender && formData.birthdate &&
                        formData.credentials.trim();
            }

            return baseValidation;
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

      const handleOpenAuxiliarModal = () => {
            setIsAuxiliarModalOpen(true);
      };

      const handleCloseAuxiliarModal = () => {
            setIsAuxiliarModalOpen(false);
      };

      const handleSaveAuxiliar = (auxiliarData) => {
            const newAuxiliar = {
                  id: Date.now(),
                  auxiliar: auxiliarData.auxiliar,
                  nombre: auxiliarData.nombre,
            };

            console.log('Nuevo auxiliar creado:', newAuxiliar);
            setIsAuxiliarModalOpen(false);
      };

      if (!isOpen) return null;

      const typeOptions = [
            { value: "cliente", label: "Cliente" },
            { value: "proveedor", label: "Proveedor" },
            { value: "otros", label: "Otros" }
      ];

      const genderOptions = [
            { value: "", label: "Seleccionar género" },
            { value: "M", label: "Masculino" },
            { value: "F", label: "Femenino" }
      ];

      const marketingOptions = [
            { value: "nacional", label: "Nacional" },
            { value: "extranjero", label: "Extranjero" }
      ];

      const taxpayerOptions = [
            { value: "contribuyente ordinario", label: "Contribuyente Ordinario" },
            { value: "contribuyente especial", label: "Contribuyente Especial" }
      ];

      const retentionOptions = [
            { value: "0", label: "0%" },
            { value: "75", label: "75%" },
            { value: "100", label: "100%" }
      ];

      return (
            <>
                  <div className="modal-overlay" onClick={handleClose}>
                        <div className={`modal-container ${currentView === 'list' ? 'large-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                              {currentView === 'form' ? (
                                    <>
                                          <ModalHeader
                                                title={isEditMode ? "Editar" : "Crear"}
                                                icon={MdBusiness}
                                          />

                                          <div className="modal-form">
                                                <FormSection title="Información Básica">

                                                      <SelectInput
                                                            id="type"
                                                            name="type"
                                                            label="Tipo"
                                                            value={formData.type}
                                                            onChange={handleInputChange}
                                                            options={typeOptions}
                                                            required
                                                      />

                                                      <RifInput
                                                            id="rif"
                                                            name="rif"
                                                            label="RIF/Cédula"
                                                            value={formData.rif}
                                                            onChange={handleInputChange}
                                                            required
                                                      />

                                                      <TextInput
                                                            id="name"
                                                            name="name"
                                                            label="Nombre"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            placeholder="Ingrese el nombre completo"
                                                            required
                                                      />

                                                      {formData.type === "cliente" && (
                                                            <>
                                                                  <SelectInput
                                                                        id="gender"
                                                                        name="gender"
                                                                        label="Género (Solo Clientes)"
                                                                        value={formData.gender}
                                                                        onChange={handleInputChange}
                                                                        options={genderOptions}
                                                                        required
                                                                  />

                                                                  <DateInput
                                                                        id="birthdate"
                                                                        name="birthdate"
                                                                        label="Fecha de Nacimiento (Solo Clientes)"
                                                                        value={formData.birthdate}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                  />
                                                            </>
                                                      )}

                                                      <TextInput
                                                            id="name_commercial"
                                                            name="name_commercial"
                                                            label="Nombre Comercial"
                                                            value={formData.name_commercial}
                                                            onChange={handleInputChange}
                                                            placeholder="Nombre comercial o razón social"
                                                      />
                                                </FormSection>

                                                <FormSection title="Información de Contacto">
                                                      <TextareaInput
                                                            id="address"
                                                            name="address"
                                                            label="Dirección"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                            placeholder="Dirección principal"
                                                            required
                                                      />

                                                      <TextareaInput
                                                            id="address_fiscal"
                                                            name="address_fiscal"
                                                            label="Dirección Fiscal"
                                                            value={formData.address_fiscal}
                                                            onChange={handleInputChange}
                                                            placeholder="Dirección fiscal (opcional)"
                                                      />

                                                      <PhoneInput
                                                            id="phone"
                                                            name="phone"
                                                            label="Teléfono"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                      />

                                                      <EmailInput
                                                            id="email"
                                                            name="email"
                                                            label="Email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                      />

                                                      <TextareaInput
                                                            id="observations"
                                                            name="observations"
                                                            label="Observaciones"
                                                            value={formData.observations}
                                                            onChange={handleInputChange}
                                                            placeholder="Observaciones adicionales"
                                                      />
                                                </FormSection>

                                                <div className="form-section">
                                                      <h3 className="section-title">Configuración Comercial</h3>

                                                      <div className="input-group">
                                                            <label htmlFor="id_categories_clients" className="input-label">
                                                                  Categoría de Cliente *
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_categories_clients"
                                                                        name="id_categories_clients"
                                                                        value={getSelectedText('id_categories_clients')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar categoría"
                                                                        onClick={() => handleOpenList('categorias', 'id_categories_clients')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('categorias', 'id_categories_clients')}
                                                                        title="Buscar categoría"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="id_categoria_default_c" className="input-label">
                                                                  Categoría Default Cliente
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_categoria_default_c"
                                                                        name="id_categoria_default_c"
                                                                        value={getSelectedText('id_categoria_default_c')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar categoría"
                                                                        onClick={() => handleOpenList('categorias', 'id_categoria_default_c')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('categorias', 'id_categoria_default_c')}
                                                                        title="Buscar categoría"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="id_categoria_default_p" className="input-label">
                                                                  Categoría Default Proveedor
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_categoria_default_p"
                                                                        name="id_categoria_default_p"
                                                                        value={getSelectedText('id_categoria_default_p')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar categoría"
                                                                        onClick={() => handleOpenList('categorias', 'id_categoria_default_p')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('categorias', 'id_categoria_default_p')}
                                                                        title="Buscar categoría"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="id_sellers" className="input-label">
                                                                  Vendedor
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_sellers"
                                                                        name="id_sellers"
                                                                        value={getSelectedText('id_sellers')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar vendedor"
                                                                        onClick={() => handleOpenList('usuarios', 'id_sellers')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('usuarios', 'id_sellers')}
                                                                        title="Buscar vendedor"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      {formData.type === "cliente" && (
                                                            <div className="input-group">
                                                                  <label htmlFor="credentials" className="input-label">
                                                                        Credenciales * (Solo Clientes)
                                                                  </label>
                                                                  <input
                                                                        type="text"
                                                                        id="credentials"
                                                                        name="credentials"
                                                                        value={formData.credentials}
                                                                        onChange={handleInputChange}
                                                                        className="modal-input"
                                                                        placeholder="Ejemplo: cliente001"
                                                                  />
                                                            </div>
                                                      )}

                                                      <div className="input-group">
                                                            <label htmlFor="marketing_environment" className="input-label">
                                                                  Ambiente de Mercadeo
                                                            </label>
                                                            <select
                                                                  id="marketing_environment"
                                                                  name="marketing_environment"
                                                                  value={formData.marketing_environment}
                                                                  onChange={handleInputChange}
                                                                  className="modal-input"
                                                            >
                                                                  {marketingOptions.map((option) => (
                                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                                  ))}
                                                            </select>
                                                      </div>
                                                </div>

                                                <div className="form-section">
                                                      <h3 className="section-title">Configuración Contable</h3>

                                                      {/* Grupo Cuenta Contable */}
                                                      <div className="account-group">
                                                            <div className="input-group">
                                                                  <label htmlFor="id_accounting_accounts" className="input-label">
                                                                        Cuenta Contable *
                                                                  </label>
                                                                  <div className="search_input_wrapper">
                                                                        <input
                                                                              type="text"
                                                                              id="id_accounting_accounts"
                                                                              name="id_accounting_accounts"
                                                                              value={getSelectedText('id_accounting_accounts')}
                                                                              readOnly
                                                                              className="modal-input"
                                                                              placeholder="Seleccionar cuenta contable"
                                                                              onClick={() => handleOpenList('plan_cuentas', 'id_accounting_accounts')}
                                                                        />
                                                                        <button
                                                                              type="button"
                                                                              className="search_button"
                                                                              onClick={() => handleOpenList('plan_cuentas', 'id_accounting_accounts')}
                                                                              title="Buscar cuenta contable"
                                                                        >
                                                                              <MdSearch size={16} />
                                                                        </button>
                                                                  </div>
                                                            </div>

                                                            <div className="input-group auxiliar-group">
                                                                  <label htmlFor="auxiliary1" className="input-label">
                                                                        <MdAccountTree size={16} className="auxiliar-icon" />
                                                                        Auxiliar 1 *
                                                                  </label>
                                                                  <div className="search_input_wrapper">
                                                                        <input
                                                                              type="text"
                                                                              id="auxiliary1"
                                                                              name="auxiliary1"
                                                                              value={getSelectedText('auxiliary1')}
                                                                              readOnly
                                                                              disabled={!isAuxiliarEnabled('id_accounting_accounts')}
                                                                              className="modal-input"
                                                                              placeholder="Seleccionar auxiliar 1"
                                                                              onClick={() => isAuxiliarEnabled('id_accounting_accounts') && handleOpenList('auxiliares', 'auxiliary1')}
                                                                        />
                                                                        <button
                                                                              type="button"
                                                                              className="search_button"
                                                                              disabled={!isAuxiliarEnabled('id_accounting_accounts')}
                                                                              onClick={() => handleOpenList('auxiliares', 'auxiliary1')}
                                                                              title="Buscar auxiliar 1"
                                                                        >
                                                                              <MdSearch size={16} />
                                                                        </button>

                                                                  </div>
                                                            </div>
                                                            <div className="auxiliar-rules">
                                                                  {getAuxiliarRules('id_accounting_accounts')}
                                                            </div>

                                                            <div className="input-group auxiliar-group">
                                                                  <label htmlFor="auxiliary2" className="input-label">
                                                                        <MdAccountTree size={16} className="auxiliar-icon" />
                                                                        Auxiliar 2
                                                                  </label>
                                                                  <div className="search_input_wrapper">
                                                                        <input
                                                                              type="text"
                                                                              id="auxiliary2"
                                                                              name="auxiliary2"
                                                                              value={getSelectedText('auxiliary2')}
                                                                              readOnly
                                                                              disabled={!isAuxiliarEnabled('id_accounting_accounts')}
                                                                              className="modal-input"
                                                                              placeholder="Seleccionar auxiliar 2"
                                                                              onClick={() => isAuxiliarEnabled('id_accounting_accounts') && handleOpenList('auxiliares', 'auxiliary2')}
                                                                        />
                                                                        <button
                                                                              type="button"
                                                                              className="search_button"
                                                                              disabled={!isAuxiliarEnabled('id_accounting_accounts')}
                                                                              onClick={() => handleOpenList('auxiliares', 'auxiliary2')}
                                                                              title="Buscar auxiliar 2"
                                                                        >
                                                                              <MdSearch size={16} />
                                                                        </button>

                                                                  </div>
                                                            </div>
                                                            <div className="auxiliar-rules">
                                                                  {getAuxiliarRules('id_accounting_accounts')}
                                                            </div>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="bank_accounts" className="input-label">
                                                                  Cuenta Bancaria
                                                            </label>
                                                            <input
                                                                  type="text"
                                                                  id="bank_accounts"
                                                                  name="bank_accounts"
                                                                  value={formData.bank_accounts}
                                                                  onChange={handleInputChange}
                                                                  className="modal-input"
                                                                  placeholder="Ejemplo: 0102-1234-5678-9012"
                                                            />
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="id_PaymentConditions" className="input-label">
                                                                  Condiciones de Pago
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_PaymentConditions"
                                                                        name="id_PaymentConditions"
                                                                        value={getSelectedText('id_PaymentConditions')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar condición de pago"
                                                                        onClick={() => handleOpenList('condiciones', 'id_PaymentConditions')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('condiciones', 'id_PaymentConditions')}
                                                                        title="Buscar condiciones de pago"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="form-section">
                                                      <h3 className="section-title">Configuración Fiscal</h3>

                                                      <div className="input-group">
                                                            <label htmlFor="type_taxpayer" className="input-label">
                                                                  Tipo de Contribuyente
                                                            </label>
                                                            <select
                                                                  id="type_taxpayer"
                                                                  name="type_taxpayer"
                                                                  value={formData.type_taxpayer}
                                                                  onChange={handleInputChange}
                                                                  className="modal-input"
                                                            >
                                                                  {taxpayerOptions.map((option) => (
                                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                                  ))}
                                                            </select>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="retention_percentage_iva" className="input-label">
                                                                  Porcentaje de Retención IVA
                                                            </label>
                                                            <select
                                                                  id="retention_percentage_iva"
                                                                  name="retention_percentage_iva"
                                                                  value={formData.retention_percentage_iva}
                                                                  onChange={handleInputChange}
                                                                  className="modal-input"
                                                            >
                                                                  {retentionOptions.map((option) => (
                                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                                  ))}
                                                            </select>
                                                      </div>

                                                      <div className="input-group">
                                                            <label htmlFor="id_RetentionISLRConcepts" className="input-label">
                                                                  Concepto de Retención ISRL
                                                            </label>
                                                            <div className="search_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="id_RetentionISLRConcepts"
                                                                        name="id_RetentionISLRConcepts"
                                                                        value={getSelectedText('id_RetentionISLRConcepts')}
                                                                        readOnly
                                                                        className="modal-input"
                                                                        placeholder="Seleccionar concepto"
                                                                        onClick={() => handleOpenList('isrl', 'id_RetentionISLRConcepts')}
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleOpenList('isrl', 'id_RetentionISLRConcepts')}
                                                                        title="Buscar concepto de retención ISRL"
                                                                  >
                                                                        <MdSearch size={16} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      <div className="input-group checkbox-group">
                                                            <CheckboxInput
                                                                  id="automatic_islr"
                                                                  name="automatic_islr"
                                                                  label="Retención ISRL Automática"
                                                                  value={formData.automatic_islr}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </div>

                                                      <div className="input-group checkbox-group">
                                                            <CheckboxInput
                                                                  id="blockade"
                                                                  name="blockade"
                                                                  label="Bloqueado"
                                                                  value={formData.blockade}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </div>

                                                      {formData.blockade && (
                                                            <div className="input-group">
                                                                  <label htmlFor="observations_blockade" className="input-label">
                                                                        Razón del Bloqueo
                                                                  </label>
                                                                  <textarea
                                                                        id="observations_blockade"
                                                                        name="observations_blockade"
                                                                        value={formData.observations_blockade}
                                                                        onChange={handleInputChange}
                                                                        className="modal-input modal-textarea"
                                                                        placeholder="Razón del bloqueo"
                                                                        rows="2"
                                                                  />
                                                            </div>
                                                      )}
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
                                                      {listType === 'plan_cuentas' && 'Seleccionar Cuenta Contable'}
                                                      {listType === 'auxiliares' && 'Seleccionar Auxiliar'}
                                                      {listType === 'categorias' && 'Seleccionar Categoría'}
                                                      {listType === 'condiciones' && 'Seleccionar Condiciones de Pago'}
                                                      {listType === 'isrl' && 'Seleccionar Concepto de Retención ISRL'}
                                                      {listType === 'usuarios' && 'Seleccionar Vendedor'}
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
                                                                              listType === 'categorias' ? 'Buscar por nombre...' :
                                                                                    listType === 'condiciones' ? 'Buscar por días o descuento...' :
                                                                                          listType === 'isrl' ? 'Buscar por código o concepto...' :
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
                                                                  ) : listType === 'categorias' ? (
                                                                        <>
                                                                              <div className="code_item_code">{item.name}</div>
                                                                              <div className="code_item_name">{item.name}</div>
                                                                        </>
                                                                  ) : listType === 'condiciones' ? (
                                                                        <>
                                                                              <div className="code_item_code">{item.days} días</div>
                                                                              <div className="code_item_name">{item.discount_percentage}% descuento</div>
                                                                        </>
                                                                  ) : listType === 'isrl' ? (
                                                                        <>
                                                                              <div className="code_item_code">{item.code}</div>
                                                                              <div className="code_item_name">{item.name}</div>
                                                                        </>
                                                                  ) : (
                                                                        <>
                                                                              <div className="code_item_code">{item.name}</div>
                                                                              <div className="code_item_name">{item.rif}</div>
                                                                        </>
                                                                  )}
                                                            </div>
                                                      ))
                                                )}
                                          </div>

                                          <ModalActions
                                                onCancel={handleCloseList}
                                                cancelText="Volver"
                                                onSave={handleOpenAuxiliarModal}
                                                isFormValid={true}
                                                isEditMode={false}
                                          />
                                    </>
                              )}
                        </div>
                  </div>

                  <AuxiliaresModal
                        isOpen={isAuxiliarModalOpen}
                        onClose={handleCloseAuxiliarModal}
                        onSave={handleSaveAuxiliar}
                        editingAuxiliar={null}
                  />
            </>
      );
};

export default CPOModal;