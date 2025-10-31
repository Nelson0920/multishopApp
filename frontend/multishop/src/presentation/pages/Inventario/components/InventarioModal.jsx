import React, { useState } from "react";
import { MdInventory, MdSearch, MdAttachMoney, MdAccountBalanceWallet } from "react-icons/md";
import {
      TextInput,
      NumberInput,
      SelectInput,
      ModalHeader,
      ModalActions,
      FormSection
} from "@components/Common/Inputs";
import "../Inventario.scss";
import CATEGORIAS from "@mocks/Categorias.json";
import USUARIOS from "@mocks/Usuarios.json";

const InventarioModal = ({
      isOpen,
      onClose,
      onSave,
      isEditMode = false,
      editingProducto = null,
      isLoading = false
}) => {
      const [formData, setFormData] = useState({
            codigo: "",
            descripcion: "",
            categoria: "",
            proveedor: "",
            und_x_bult: "",
            cod_barra: "",
            referencia: "",
            porcentaje_impuesto: "",
            componente: "",
            producto_compuesto: "No",
            prioridad_busquedas: "",
            ganancia: "",
            precio1_con_impuesto: "",
            precio1_sin_impuesto: "",
            precio2_con_impuesto: "",
            precio2_sin_impuesto: "",
            precio3_con_impuesto: "",
            precio3_sin_impuesto: "",
            precio4_con_impuesto: "",
            precio4_sin_impuesto: "",
            precio_regulado: ""
      });

      React.useEffect(() => {
            if (isEditMode && editingProducto) {
                  setFormData({
                        codigo: editingProducto.codigo || "",
                        descripcion: editingProducto.descripcion || "",
                        categoria: editingProducto.categoria || "",
                        proveedor: editingProducto.proveedor || "",
                        und_x_bult: editingProducto.und_x_bult || "",
                        cod_barra: editingProducto.cod_barra || "",
                        referencia: editingProducto.referencia || "",
                        porcentaje_impuesto: editingProducto.porcentaje_impuesto || "",
                        componente: editingProducto.componente || "",
                        producto_compuesto: editingProducto.producto_compuesto || "No",
                        prioridad_busquedas: editingProducto.prioridad_busquedas || "",
                        ganancia: editingProducto.ganancia || "",
                        precio1_con_impuesto: editingProducto.precio1_con_impuesto || "",
                        precio1_sin_impuesto: editingProducto.precio1_sin_impuesto || "",
                        precio2_con_impuesto: editingProducto.precio2_con_impuesto || "",
                        precio2_sin_impuesto: editingProducto.precio2_sin_impuesto || "",
                        precio3_con_impuesto: editingProducto.precio3_con_impuesto || "",
                        precio3_sin_impuesto: editingProducto.precio3_sin_impuesto || "",
                        precio4_con_impuesto: editingProducto.precio4_con_impuesto || "",
                        precio4_sin_impuesto: editingProducto.precio4_sin_impuesto || "",
                        precio_regulado: editingProducto.precio_regulado || ""
                  });
            } else {
                  setFormData({
                        codigo: "",
                        descripcion: "",
                        categoria: "",
                        proveedor: "",
                        und_x_bult: "",
                        cod_barra: "",
                        referencia: "",
                        porcentaje_impuesto: "",
                        componente: "",
                        producto_compuesto: "No",
                        prioridad_busquedas: "",
                        ganancia: "",
                        precio1_con_impuesto: "",
                        precio1_sin_impuesto: "",
                        precio2_con_impuesto: "",
                        precio2_sin_impuesto: "",
                        precio3_con_impuesto: "",
                        precio3_sin_impuesto: "",
                        precio4_con_impuesto: "",
                        precio4_sin_impuesto: "",
                        precio_regulado: ""
                  });
            }
      }, [isEditMode, editingProducto, isOpen]);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));
      };

      const handleSave = () => {
            if (!isFormValid()) return;
            onSave(formData);
      };

      const handleClose = () => {
            setFormData({
                  codigo: "",
                  descripcion: "",
                  categoria: "",
                  proveedor: "",
                  und_x_bult: "",
                  cod_barra: "",
                  referencia: "",
                  porcentaje_impuesto: "",
                  componente: "",
                  producto_compuesto: "No",
                  prioridad_busquedas: "",
                  ganancia: "",
                  precio1_con_impuesto: "",
                  precio1_sin_impuesto: "",
                  precio2_con_impuesto: "",
                  precio2_sin_impuesto: "",
                  precio3_con_impuesto: "",
                  precio3_sin_impuesto: "",
                  precio4_con_impuesto: "",
                  precio4_sin_impuesto: "",
                  precio_regulado: ""
            });
            onClose();
      };

      const isFormValid = () => {
            return formData.codigo.trim() &&
                  formData.descripcion.trim() &&
                  formData.categoria &&
                  formData.proveedor;
      };

      const getCategoriaOptions = () => {
            return CATEGORIAS.map(categoria => ({
                  value: categoria.id,
                  label: `${categoria.codigo} - ${categoria.nombre}`
            }));
      };

      const getProveedorOptions = () => {
            return USUARIOS.filter(usuario => usuario.type_seller === "P")
                  .map(proveedor => ({
                        value: proveedor.id,
                        label: `${proveedor.name} (${proveedor.rif})`
                  }));
      };

      const productoCompuestoOptions = [
            { value: "Si", label: "Sí" },
            { value: "No", label: "No" }
      ];

      const isFormLoading = isLoading;

      if (!isOpen) return null;

      return (
            <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-container large-modal" onClick={(e) => e.stopPropagation()}>
                        <ModalHeader
                              title={isEditMode ? "Editar Producto" : "Crear Producto"}
                              icon={MdInventory}
                        />

                        <div className="modal-form">
                              {/* Datos Generales */}
                              <FormSection title="Datos Generales" icon={MdInventory}>
                                    <div className="form-row two-columns">
                                          <TextInput
                                                id="codigo"
                                                name="codigo"
                                                label="Código"
                                                value={formData.codigo}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: FF00666"
                                                required
                                                hasError={false}
                                                errorMessage=""
                                          />

                                          <TextInput
                                                id="descripcion"
                                                name="descripcion"
                                                label="Descripción"
                                                value={formData.descripcion}
                                                onChange={handleInputChange}
                                                placeholder="Descripción del producto"
                                                required
                                                hasError={false}
                                                errorMessage=""
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <SelectInput
                                                id="categoria"
                                                name="categoria"
                                                label="Categoría"
                                                value={formData.categoria}
                                                onChange={handleInputChange}
                                                options={getCategoriaOptions()}
                                                placeholder="Seleccionar categoría"
                                                required
                                          />

                                          <SelectInput
                                                id="proveedor"
                                                name="proveedor"
                                                label="Proveedor"
                                                value={formData.proveedor}
                                                onChange={handleInputChange}
                                                options={getProveedorOptions()}
                                                placeholder="Seleccionar proveedor"
                                                required
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="und_x_bult"
                                                name="und_x_bult"
                                                label="Unidades por Bulto"
                                                value={formData.und_x_bult}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 1.00"
                                                min="0"
                                                step="0.01"
                                                required
                                          />

                                          <TextInput
                                                id="cod_barra"
                                                name="cod_barra"
                                                label="Código de Barra"
                                                value={formData.cod_barra}
                                                onChange={handleInputChange}
                                                placeholder="Código de barra"
                                                hasError={false}
                                                errorMessage=""
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <TextInput
                                                id="referencia"
                                                name="referencia"
                                                label="Referencia"
                                                value={formData.referencia}
                                                onChange={handleInputChange}
                                                placeholder="Referencia del producto"
                                                hasError={false}
                                                errorMessage=""
                                          />

                                          <NumberInput
                                                id="porcentaje_impuesto"
                                                name="porcentaje_impuesto"
                                                label="(%) Impuesto"
                                                value={formData.porcentaje_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <TextInput
                                                id="componente"
                                                name="componente"
                                                label="Componente"
                                                value={formData.componente}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: ACETAMINOFEN"
                                                hasError={false}
                                                errorMessage=""
                                          />

                                          <SelectInput
                                                id="producto_compuesto"
                                                name="producto_compuesto"
                                                label="Producto Compuesto"
                                                value={formData.producto_compuesto}
                                                onChange={handleInputChange}
                                                options={productoCompuestoOptions}
                                                placeholder="Seleccionar"
                                          />
                                    </div>

                                    <div className="form-row">
                                          <TextInput
                                                id="prioridad_busquedas"
                                                name="prioridad_busquedas"
                                                label="Prioridad en Búsquedas"
                                                value={formData.prioridad_busquedas}
                                                onChange={handleInputChange}
                                                placeholder="Prioridad en búsquedas"
                                                hasError={false}
                                                errorMessage=""
                                          />
                                    </div>
                              </FormSection>

                              {/* Precios */}
                              <FormSection title="Precios" icon={MdAttachMoney}>
                                    <div className="form-row">
                                          <NumberInput
                                                id="ganancia"
                                                name="ganancia"
                                                label="(%) Ganancia"
                                                value={formData.ganancia}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 62.1213"
                                                min="0"
                                                step="0.0001"
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="precio1_con_impuesto"
                                                name="precio1_con_impuesto"
                                                label="Precio 1 (Con Impuesto)"
                                                value={formData.precio1_con_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 695.88"
                                                min="0"
                                                step="0.01"
                                          />

                                          <NumberInput
                                                id="precio1_sin_impuesto"
                                                name="precio1_sin_impuesto"
                                                label="Precio 1 (Sin Impuesto)"
                                                value={formData.precio1_sin_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 695.88"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="precio2_con_impuesto"
                                                name="precio2_con_impuesto"
                                                label="Precio 2 (Con Impuesto)"
                                                value={formData.precio2_con_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />

                                          <NumberInput
                                                id="precio2_sin_impuesto"
                                                name="precio2_sin_impuesto"
                                                label="Precio 2 (Sin Impuesto)"
                                                value={formData.precio2_sin_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="precio3_con_impuesto"
                                                name="precio3_con_impuesto"
                                                label="Precio 3 (Con Impuesto)"
                                                value={formData.precio3_con_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />

                                          <NumberInput
                                                id="precio3_sin_impuesto"
                                                name="precio3_sin_impuesto"
                                                label="Precio 3 (Sin Impuesto)"
                                                value={formData.precio3_sin_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="precio4_con_impuesto"
                                                name="precio4_con_impuesto"
                                                label="Precio 4 (Con Impuesto)"
                                                value={formData.precio4_con_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />

                                          <NumberInput
                                                id="precio4_sin_impuesto"
                                                name="precio4_sin_impuesto"
                                                label="Precio 4 (Sin Impuesto)"
                                                value={formData.precio4_sin_impuesto}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>

                                    <div className="form-row">
                                          <NumberInput
                                                id="precio_regulado"
                                                name="precio_regulado"
                                                label="Precio Regulado"
                                                value={formData.precio_regulado}
                                                onChange={handleInputChange}
                                                placeholder="Ejemplo: 0.00"
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>
                              </FormSection>

                              {/* Costos */}
                              <FormSection title="Costos" icon={MdAccountBalanceWallet}>
                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="costo_anterior"
                                                name="costo_anterior"
                                                label="Costo Anterior"
                                                value="121.27"
                                                onChange={() => { }}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                disabled
                                          />

                                          <NumberInput
                                                id="costo_promedio"
                                                name="costo_promedio"
                                                label="Costo Promedio"
                                                value="263.59"
                                                onChange={() => { }}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                disabled
                                          />
                                    </div>

                                    <div className="form-row two-columns">
                                          <NumberInput
                                                id="costo_segun_factura"
                                                name="costo_segun_factura"
                                                label="Costo Según Factura"
                                                value="462.24"
                                                onChange={() => { }}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                disabled
                                          />

                                          <NumberInput
                                                id="costo_actual"
                                                name="costo_actual"
                                                label="Costo Actual"
                                                value="462.24"
                                                onChange={() => { }}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                disabled
                                          />
                                    </div>
                              </FormSection>
                        </div>

                        <ModalActions
                              onSave={handleSave}
                              onCancel={handleClose}
                              isLoading={isFormLoading}
                              isFormValid={isFormValid()}
                        />
                  </div>
            </div>
      );
};

export default InventarioModal;
