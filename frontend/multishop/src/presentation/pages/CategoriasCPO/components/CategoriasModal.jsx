import React, { useState } from "react";
import { MdCategory } from "react-icons/md";
import {
      TextInput,
      NumberInput,
      ModalHeader,
      ModalActions
} from "@components/Common/Inputs";
import AccountSelector from "@components/Common/AccountSelector";
import "../Categorias.scss";

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
            plan_cuentas: "",
            auxiliary1: "",
            auxiliary2: "",
            createdAt: "",
            deadline_day: ""
      });
      const [currentView, setCurrentView] = useState('form');

      React.useEffect(() => {
            if (isOpen) {
                  if (editingCategoria) {
                        setFormData({
                              id: editingCategoria.id || '',
                              name: editingCategoria.name || '',
                              credit_limit: editingCategoria.credit_limit || '',
                              credit_terms: editingCategoria.credit_terms || '',
                              discount_percentage: editingCategoria.discount_percentage || '',
                              plan_cuentas: editingCategoria.plan_cuentas || '',
                              auxiliary1: editingCategoria.auxiliary1 || '',
                              auxiliary2: editingCategoria.auxiliary2 || '',
                              createdAt: editingCategoria.createdAt || '',
                              deadline_day: editingCategoria.deadline_day || ''
                        });
                  } else {
                        setFormData({
                              name: "",
                              credit_limit: "",
                              credit_terms: "",
                              discount_percentage: "",
                              plan_cuentas: "",
                              auxiliary1: "",
                              auxiliary2: "",
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


      const isFormValid = () => {
            return formData.name.trim() &&
                  formData.credit_limit &&
                  formData.credit_terms &&
                  formData.discount_percentage &&
                  formData.deadline_day &&
                  formData.deadline_day <= 1825;
      };

      const handleSave = () => {
            if (!isFormValid()) return;
            onSave(formData);
      };

      const handleClose = () => {
            setFormData({
                  name: "",
                  credit_limit: "",
                  credit_terms: "",
                  discount_percentage: "",
                  plan_cuentas: "",
                  auxiliary1: "",
                  auxiliary2: "",
                  createdAt: "",
                  deadline_day: ""
            });
            setCurrentView('form');
            onClose();
      };

      const isFormLoading = isLoading;

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className={`modal-container ${currentView === 'list' ? 'large-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
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
                                    hasError={false}
                                    errorMessage=""
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
                                    hasError={false}
                                    errorMessage=""
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

                              {/* Grupo Cuenta Contable + Auxiliares */}
                              <AccountSelector
                                    labelAccount="Plan de Cuentas"
                                    labelAux1="Auxiliar 1"
                                    labelAux2="Auxiliar 2"
                                    numAuxiliaries={2}
                                    value={{
                                          account: formData.plan_cuentas,
                                          auxiliary1: formData.auxiliary1,
                                          auxiliary2: formData.auxiliary2,
                                    }}
                                    onChange={({ account, auxiliary1, auxiliary2 }) => {
                                          setFormData(prev => ({
                                                ...prev,
                                                plan_cuentas: account ?? prev.plan_cuentas,
                                                auxiliary1: auxiliary1 ?? prev.auxiliary1,
                                                auxiliary2: auxiliary2 ?? prev.auxiliary2_id,
                                          }));
                                    }}
                              />

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
                  </div>
            </div>
      );
};

export default CategoriasModal;
