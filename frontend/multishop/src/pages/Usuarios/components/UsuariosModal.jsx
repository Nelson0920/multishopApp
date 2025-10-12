import React, { useState } from "react";
import { MdPeople } from "react-icons/md";
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

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                              <h2 className="modal-title">
                                    {isEditMode ? "Editar Usuario" : "Crear Usuario"}
                              </h2>
                              <div className="modal-icon">
                                    <MdPeople size={24} color="#36aad4" />
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
                                          placeholder="Ingrese el nombre completo"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="rif" className="input-label">
                                          RIF/Cédula
                                    </label>
                                    <input
                                          type="text"
                                          id="rif"
                                          name="rif"
                                          value={formData.rif}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: V-12345678 o J-87654321"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="address" className="input-label">
                                          Dirección
                                    </label>
                                    <textarea
                                          id="address"
                                          name="address"
                                          value={formData.address}
                                          onChange={handleInputChange}
                                          className="modal-input modal-textarea"
                                          placeholder="Ingrese la dirección (opcional)"
                                          rows="3"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="phone" className="input-label">
                                          Teléfono *
                                    </label>
                                    <input
                                          type="tel"
                                          id="phone"
                                          name="phone"
                                          value={formData.phone}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: 0412-1234567"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="email" className="input-label">
                                          Email
                                    </label>
                                    <input
                                          type="email"
                                          id="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                          placeholder="Ejemplo: usuario@email.com"
                                    />
                              </div>

                              <div className="input-group">
                                    <label htmlFor="type_seller" className="input-label">
                                          Tipo de Usuario *
                                    </label>
                                    <select
                                          id="type_seller"
                                          name="type_seller"
                                          value={formData.type_seller}
                                          onChange={handleInputChange}
                                          className="modal-input"
                                    >
                                          <option value="U">Cliente</option>
                                          <option value="P">Proveedor</option>
                                    </select>
                              </div>

                              {formData.type_seller === "P" && (
                                    <div className="input-group">
                                          <label htmlFor="commission" className="input-label">
                                                Comisión * (Proveedores)
                                          </label>
                                          <input
                                                type="number"
                                                id="commission"
                                                name="commission"
                                                value={formData.commission}
                                                onChange={handleInputChange}
                                                className="modal-input"
                                                placeholder="Ejemplo: 5.5"
                                                min="0"
                                                max="100"
                                                step="0.1"
                                          />
                                    </div>
                              )}

                              {formData.type_seller === "U" && (
                                    <div className="input-group">
                                          <label htmlFor="credentials" className="input-label">
                                                Credenciales * (Clientes)
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

export default UsuariosModal;
