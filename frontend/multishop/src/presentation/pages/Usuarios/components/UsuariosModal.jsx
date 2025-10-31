import React, { useState } from "react";
import { MdPeople } from "react-icons/md";
import {
      TextInput,
      RifInput,
      TextareaInput,
      PhoneInput,
      EmailInput,
      SelectInput,
      NumberInput,
      ModalHeader,
      ModalActions
} from "@components/Common/Inputs";
import "../Usuarios.scss";

const UsuariosModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      initialData = {
            name: "",
            rif: "",
            address: "",
            phone: "",
            email: "",
            type_seller: "U",
            commission: "",
            credentials: ""
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
            const baseValidation = formData.name.trim() && formData.phone.trim();

            if (formData.type_seller === "P") {
                  return baseValidation && formData.commission !== "" && formData.commission >= 0;
            } else {
                  return baseValidation && formData.credentials.trim();
            }
      };

      const handleSave = () => {
            if (!isFormValid()) return;
            const cleanData = { ...formData };
            if (cleanData.type_seller === "U") {
                  cleanData.commission = null;
            } else {
                  cleanData.credentials = null;
            }

            onSave(cleanData);
      };

      const handleClose = () => {
            setFormData(initialData);
            onClose();
      };

      if (!isOpen) return null;

      const typeOptions = [
            { value: "U", label: "Cliente" },
            { value: "P", label: "Proveedor" }
      ];

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <ModalHeader
                              title={isEditMode ? "Editar Usuario" : "Crear Usuario"}
                              icon={MdPeople}
                        />

                        <div className="modal-form">
                              <TextInput
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el nombre completo"
                                    required
                                    hasError={false}
                                    errorMessage=""
                              />

                              <RifInput
                                    id="rif"
                                    name="rif"
                                    label="RIF/Cédula"
                                    value={formData.rif}
                                    onChange={handleInputChange}
                              />

                              <TextareaInput
                                    id="address"
                                    name="address"
                                    label="Dirección"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese la dirección (opcional)"
                              />

                              <PhoneInput
                                    id="phone"
                                    name="phone"
                                    label="Teléfono"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                              />

                              <EmailInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                              />

                              <SelectInput
                                    id="type_seller"
                                    name="type_seller"
                                    label="Tipo de Usuario"
                                    value={formData.type_seller}
                                    onChange={handleInputChange}
                                    options={typeOptions}
                                    required
                              />

                              {formData.type_seller === "P" && (
                                    <NumberInput
                                          id="commission"
                                          name="commission"
                                          label="Comisión (Proveedores)"
                                          value={formData.commission}
                                          onChange={handleInputChange}
                                          placeholder="Ejemplo: 5.5"
                                          min="0"
                                          max="100"
                                          step="0.1"
                                          required
                                    />
                              )}

                              {formData.type_seller === "U" && (
                                    <TextInput
                                          id="credentials"
                                          name="credentials"
                                          label="Credenciales (Clientes)"
                                          value={formData.credentials}
                                          onChange={handleInputChange}
                                          placeholder="Ejemplo: cliente001"
                                          required
                                          hasError={false}
                                          errorMessage=""
                                    />
                              )}
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

export default UsuariosModal;
