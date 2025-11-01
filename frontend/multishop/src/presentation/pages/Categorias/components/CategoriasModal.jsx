import React, { useState, useEffect } from "react";
import { MdCategory } from "react-icons/md";
import {
      TextInput,
      ModalHeader,
      ModalActions
} from "@components/Common/Inputs";
import "../Categorias.scss";
import AccountSelector from "@components/Common/AccountSelector";

const CategoriasModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      data = null,
}) => {
      const [formData, setFormData] = useState({
            id: '',
            nombre: '',
            margenGanancia: '',
            porcentajeComision: '',
            cuentaVentas: '',
            cuentaCompras: '',
            cuentaConsumos: '',
            cuentaDevCompras: '',
            cuentaIVA: '',
      });

      useEffect(() => {
            if (isOpen && isEditMode && data) {
                  setFormData({
                        id: data.id,
                        nombre: data.nombre,
                        margenGanancia: data.margenGanancia,
                        porcentajeComision: data.porcentajeComision,
                        cuentaVentas: data.cuentaVentas,
                        cuentaCompras: data.cuentaCompras,
                        cuentaConsumos: data.cuentaConsumos,
                        cuentaDevCompras: data.cuentaDevCompras,
                        cuentaIVA: data.cuentaIVA,
                        auxiliarCompras: data.auxiliarCompras,
                        auxiliarConsumos: data.auxiliarConsumos,
                        auxiliarDevCompras: data.auxiliarDevCompras,
                        auxiliarIVA: data.auxiliarIVA,
                        auxiliarIVA2: data.auxiliarIVA2,
                  });
            } else {
                  setFormData({
                        id: '',
                        nombre: '',
                        margenGanancia: '',
                        porcentajeComision: '',
                        cuentaVentas: '',
                        cuentaCompras: '',
                        cuentaConsumos: '',
                        cuentaDevCompras: '',
                        cuentaIVA: '',
                        auxiliarCompras: '',
                        auxiliarConsumos: '',
                        auxiliarDevCompras: '',
                        auxiliarIVA: '',
                        auxiliarIVA2: '',
                  });
            }
      }, [data, isEditMode, isOpen]);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));
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
            //setFormData(initialData);
            onClose();
      };

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className={`modal-container`} onClick={(e) => e.stopPropagation()}>
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
                                          hasError={false}
                                          errorMessage=""
                                    />

                                    <TextInput
                                          id="margenGanancia"
                                          name="margenGanancia"
                                          label="Margen de Ganancia"
                                          value={formData.margenGanancia}
                                          onChange={handleInputChange}
                                          placeholder="Ejemplo: 25%"
                                          required
                                          hasError={false}
                                          errorMessage=""
                                    />

                                    <TextInput
                                          id="porcentajeComision"
                                          name="porcentajeComision"
                                          label="Porcentaje de Comisión"
                                          value={formData.porcentajeComision}
                                          onChange={handleInputChange}
                                          placeholder="Ejemplo: 8%"
                                          required
                                          hasError={false}
                                          errorMessage=""
                                    />

                                    {/* Grupo Ventas - sin auxiliares */}
                                    <AccountSelector
                                          labelAccount="Cuenta de Ventas"
                                          numAuxiliaries={0}
                                          value={{ account: formData.cuentaVentas, auxiliary1: null, auxiliary2: null }}
                                          onChange={({ account }) => setFormData(prev => ({ ...prev, cuentaVentas: account ?? prev.cuentaVentas }))}
                                    />

                                    {/* Grupo Compras */}
                                    <AccountSelector
                                          labelAccount="Cuenta de Compras"
                                          aux1Number={2}
                                          numAuxiliaries={1}
                                          value={{ account: formData.cuentaCompras, auxiliary1: formData.auxiliarCompras, auxiliary2: null }}
                                          onChange={({ account, auxiliary1 }) => setFormData(prev => ({ ...prev, cuentaCompras: account ?? prev.cuentaCompras, auxiliarCompras: auxiliary1 ?? prev.auxiliarCompras }))}
                                    />

                                    {/* Grupo Consumos */}
                                    <AccountSelector
                                          labelAccount="Cuenta de Consumos"
                                          aux1Number={1}
                                          numAuxiliaries={1}
                                          value={{ account: formData.cuentaConsumos, auxiliary1: formData.auxiliarConsumos, auxiliary2: null }}
                                          onChange={({ account, auxiliary1 }) => setFormData(prev => ({ ...prev, cuentaConsumos: account ?? prev.cuentaConsumos, auxiliarConsumos: auxiliary1 ?? prev.auxiliarConsumos }))}
                                    />

                                    {/* Grupo Devoluciones en Compras */}
                                    <AccountSelector
                                          labelAccount="Cuenta de Devoluciones en Compras"
                                          aux1Number={2}
                                          numAuxiliaries={1}
                                          value={{ account: formData.cuentaDevCompras, auxiliary1: formData.auxiliarDevCompras, auxiliary2: null }}
                                          onChange={({ account, auxiliary1 }) => setFormData(prev => ({ ...prev, cuentaDevCompras: account ?? prev.cuentaDevCompras, auxiliarDevCompras: auxiliary1 ?? prev.auxiliarDevCompras }))}
                                    />

                                    {/* Grupo IVA */}
                                    <AccountSelector
                                          labelAccount="Cuenta de IVA"
                                          aux1Number={1}
                                          aux2Number={2}
                                          numAuxiliaries={2}
                                          value={{ account: formData.cuentaIVA, auxiliary1: formData.auxiliarIVA, auxiliary2: formData.auxiliarIVA2 }}
                                          onChange={({ account, auxiliary1, auxiliary2 }) => setFormData(prev => ({
                                                ...prev,
                                                cuentaIVA: account ?? prev.cuentaIVA,
                                                auxiliarIVA: auxiliary1 ?? prev.auxiliarIVA,
                                                auxiliarIVA2: auxiliary2 ?? prev.auxiliarIVA2,
                                          }))}
                                    />
                              </div>

                              <ModalActions
                                    onCancel={handleClose}
                                    onSave={handleSave}
                                    isFormValid={isFormValid()}
                                    isEditMode={isEditMode}
                              />
                        </>
                  </div>
            </div>

      );
};

export default CategoriasModal;

