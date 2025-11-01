import React, { useState, useEffect } from 'react';
import TextInput from '../Common/Inputs/TextInput';
import NumberInput from '../Common/Inputs/NumberInput';
import SelectInput from '../Common/Inputs/SelectInput';
import TextareaInput from '../Common/Inputs/TextareaInput';
import InventarioValidator from '@business/validators/InventarioValidator';

const InventarioForm = ({
      initialData = {},
      onSubmit,
      onCancel,
      isEditing = false,
      categories = [],
      loading = false
}) => {
      const [formData, setFormData] = useState({
            nombre: '',
            descripcion: '',
            categoriaId: '',
            precio: '',
            costo: '',
            stock: '',
            stockMinimo: '',
            stockMaximo: '',
            sku: '',
            codigoBarras: '',
            estado: 'active',
            ...initialData
      });

      const [errors, setErrors] = useState({});
      const [profitMargin, setProfitMargin] = useState({});

      useEffect(() => {
            if (isEditing && initialData.id) {
                  setFormData(prev => ({
                        ...prev,
                        ...initialData
                  }));
            }
      }, [initialData, isEditing]);

      useEffect(() => {
            // Calcular margen de ganancia cuando cambien precio o costo
            if (formData.precio && formData.costo) {
                  const precio = parseFloat(formData.precio) || 0;
                  const costo = parseFloat(formData.costo) || 0;
                  const margin = InventarioValidator.validateProfitMargin(precio, costo);
                  setProfitMargin(margin);
            }
      }, [formData.precio, formData.costo]);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                  ...prev,
                  [name]: value
            }));

            // Limpiar error del campo cuando el usuario empiece a escribir
            if (errors[name]) {
                  setErrors(prev => ({
                        ...prev,
                        [name]: ''
                  }));
            }
      };

      const validateForm = () => {
            const validationErrors = InventarioValidator.getValidationErrors(formData);
            const fieldErrors = {};

            validationErrors.forEach(error => {
                  // Mapear errores generales a campos específicos
                  if (error.includes('nombre')) {
                        fieldErrors.nombre = error;
                  } else if (error.includes('descripción')) {
                        fieldErrors.descripcion = error;
                  } else if (error.includes('precio')) {
                        fieldErrors.precio = error;
                  } else if (error.includes('costo')) {
                        fieldErrors.costo = error;
                  } else if (error.includes('stock')) {
                        if (error.includes('mínimo')) {
                              fieldErrors.stockMinimo = error;
                        } else if (error.includes('máximo')) {
                              fieldErrors.stockMaximo = error;
                        } else {
                              fieldErrors.stock = error;
                        }
                  } else if (error.includes('SKU')) {
                        fieldErrors.sku = error;
                  } else if (error.includes('código de barras')) {
                        fieldErrors.codigoBarras = error;
                  } else if (error.includes('estado')) {
                        fieldErrors.estado = error;
                  }
            });

            setErrors(fieldErrors);
            return Object.keys(fieldErrors).length === 0;
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            if (validateForm()) {
                  onSubmit(formData);
            }
      };

      const categoryOptions = categories.map(cat => ({
            value: cat.id,
            label: cat.name
      }));

      const statusOptions = [
            { value: 'active', label: 'Activo' },
            { value: 'inactive', label: 'Inactivo' },
            { value: 'discontinued', label: 'Descontinuado' }
      ];

      return (
            <form onSubmit={handleSubmit} className="inventario-form">
                  <div className="form-row">
                        <TextInput
                              id="nombre"
                              name="nombre"
                              label="Nombre del Producto"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              placeholder="Ingrese el nombre del producto"
                              required={true}
                              maxLength={200}
                              hasError={!!errors.nombre}
                              errorMessage={errors.nombre}
                        />
                  </div>

                  <div className="form-row">
                        <TextareaInput
                              id="descripcion"
                              name="descripcion"
                              label="Descripción"
                              value={formData.descripcion}
                              onChange={handleInputChange}
                              placeholder="Descripción del producto"
                              maxLength={1000}
                              className={errors.descripcion ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
                  </div>

                  <div className="form-row">
                        <SelectInput
                              id="categoriaId"
                              name="categoriaId"
                              label="Categoría"
                              value={formData.categoriaId}
                              onChange={handleInputChange}
                              options={categoryOptions}
                              placeholder="Seleccione una categoría"
                              className={errors.categoriaId ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.categoriaId && <span className="error-message">{errors.categoriaId}</span>}
                  </div>

                  <div className="form-row two-columns">
                        <NumberInput
                              id="precio"
                              name="precio"
                              label="Precio de Venta"
                              value={formData.precio}
                              onChange={handleInputChange}
                              placeholder="0.00"
                              required={true}
                              min="0"
                              step="0.01"
                              className={errors.precio ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.precio && <span className="error-message">{errors.precio}</span>}

                        <NumberInput
                              id="costo"
                              name="costo"
                              label="Costo"
                              value={formData.costo}
                              onChange={handleInputChange}
                              placeholder="0.00"
                              required={true}
                              min="0"
                              step="0.01"
                              className={errors.costo ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.costo && <span className="error-message">{errors.costo}</span>}
                  </div>

                  {profitMargin.message && (
                        <div className={`profit-margin ${profitMargin.warning ? 'warning' : 'info'}`}>
                              {profitMargin.message}
                        </div>
                  )}

                  <div className="form-row three-columns">
                        <NumberInput
                              id="stock"
                              name="stock"
                              label="Stock Actual"
                              value={formData.stock}
                              onChange={handleInputChange}
                              placeholder="0"
                              required={true}
                              min="0"
                              className={errors.stock ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.stock && <span className="error-message">{errors.stock}</span>}

                        <NumberInput
                              id="stockMinimo"
                              name="stockMinimo"
                              label="Stock Mínimo"
                              value={formData.stockMinimo}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              className={errors.stockMinimo ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.stockMinimo && <span className="error-message">{errors.stockMinimo}</span>}

                        <NumberInput
                              id="stockMaximo"
                              name="stockMaximo"
                              label="Stock Máximo"
                              value={formData.stockMaximo}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              className={errors.stockMaximo ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.stockMaximo && <span className="error-message">{errors.stockMaximo}</span>}
                  </div>

                  <div className="form-row two-columns">
                        <TextInput
                              id="sku"
                              name="sku"
                              label="SKU"
                              value={formData.sku}
                              onChange={handleInputChange}
                              placeholder="Código SKU"
                              maxLength={50}
                              hasError={!!errors.sku}
                              errorMessage={errors.sku}
                        />

                        <TextInput
                              id="codigoBarras"
                              name="codigoBarras"
                              label="Código de Barras"
                              value={formData.codigoBarras}
                              onChange={handleInputChange}
                              placeholder="Código de barras"
                              maxLength={20}
                              hasError={!!errors.codigoBarras}
                              errorMessage={errors.codigoBarras}
                        />
                  </div>

                  <div className="form-row">
                        <SelectInput
                              id="estado"
                              name="estado"
                              label="Estado"
                              value={formData.estado}
                              onChange={handleInputChange}
                              options={statusOptions}
                              className={errors.estado ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.estado && <span className="error-message">{errors.estado}</span>}
                  </div>

                  <div className="form-actions">
                        <button
                              type="button"
                              onClick={onCancel}
                              className="btn btn-secondary"
                              disabled={loading}
                        >
                              Cancelar
                        </button>
                        <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={loading}
                        >
                              {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                        </button>
                  </div>
            </form>
      );
};

export default InventarioForm;
