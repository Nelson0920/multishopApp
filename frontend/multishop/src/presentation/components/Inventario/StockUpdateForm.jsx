import React, { useState } from 'react';
import NumberInput from '../Common/Inputs/NumberInput';
import SelectInput from '../Common/Inputs/SelectInput';
import InventarioValidator from '@business/validators/InventarioValidator';

const StockUpdateForm = ({
      producto,
      onSubmit,
      onCancel,
      loading = false
}) => {
      const [formData, setFormData] = useState({
            cantidad: '',
            operacion: 'set'
      });

      const [errors, setErrors] = useState({});

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
            const stockData = {
                  cantidad: formData.cantidad,
                  operacion: formData.operacion,
                  productoId: producto.id
            };

            if (!InventarioValidator.validateStockUpdate(stockData)) {
                  setErrors({
                        cantidad: 'La cantidad es requerida',
                        operacion: 'La operación es requerida'
                  });
                  return false;
            }

            const cantidad = parseFloat(formData.cantidad);
            if (isNaN(cantidad) || cantidad < 0) {
                  setErrors({
                        cantidad: 'La cantidad debe ser un número válido mayor o igual a 0'
                  });
                  return false;
            }

            // Validar que no se pueda restar más stock del disponible
            if (formData.operacion === 'subtract' && cantidad > parseFloat(producto.existencia_general)) {
                  setErrors({
                        cantidad: `No se puede restar más stock del disponible (${producto.existencia_general})`
                  });
                  return false;
            }

            setErrors({});
            return true;
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            if (validateForm()) {
                  onSubmit({
                        productoId: producto.id,
                        cantidad: parseFloat(formData.cantidad),
                        operacion: formData.operacion
                  });
            }
      };

      const operationOptions = [
            { value: 'set', label: 'Establecer Stock' },
            { value: 'add', label: 'Agregar Stock' },
            { value: 'subtract', label: 'Restar Stock' }
      ];

      const getNewStockPreview = () => {
            if (!formData.cantidad || !formData.operacion) return null;

            const cantidad = parseFloat(formData.cantidad);
            if (isNaN(cantidad)) return null;

            let newStock = parseFloat(producto.existencia_general);
            switch (formData.operacion) {
                  case 'set':
                        newStock = cantidad;
                        break;
                  case 'add':
                        newStock = parseFloat(producto.existencia_general) + cantidad;
                        break;
                  case 'subtract':
                        newStock = Math.max(0, parseFloat(producto.existencia_general) - cantidad);
                        break;
                  default:
                        return null;
            }

            return newStock;
      };

      const newStock = getNewStockPreview();

      return (
            <form onSubmit={handleSubmit} className="stock-update-form">
                  <div className="product-info">
                        <h3>Actualizar Stock</h3>
                        <p><strong>Producto:</strong> {producto.descripcion}</p>
                        <p><strong>Stock Actual:</strong> {producto.existencia_general}</p>
                        <p><strong>Código:</strong> {producto.codigo}</p>
                  </div>

                  <div className="form-row">
                        <SelectInput
                              id="operacion"
                              name="operacion"
                              label="Operación"
                              value={formData.operacion}
                              onChange={handleInputChange}
                              options={operationOptions}
                              required={true}
                              className={errors.operacion ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.operacion && <span className="error-message">{errors.operacion}</span>}
                  </div>

                  <div className="form-row">
                        <NumberInput
                              id="cantidad"
                              name="cantidad"
                              label="Cantidad"
                              value={formData.cantidad}
                              onChange={handleInputChange}
                              placeholder="0"
                              required={true}
                              min="0"
                              className={errors.cantidad ? 'modal-input error' : 'modal-input'}
                        />
                        {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
                  </div>

                  {newStock !== null && (
                        <div className="stock-preview">
                              <p><strong>Stock Resultante:</strong> {newStock}</p>
                              {newStock < parseFloat(producto.stock_minimo) && (
                                    <p className="warning">⚠️ El stock resultante estará por debajo del mínimo ({producto.stock_minimo})</p>
                              )}
                              {newStock === 0 && (
                                    <p className="warning">⚠️ El producto quedará sin stock</p>
                              )}
                        </div>
                  )}

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
                              {loading ? 'Actualizando...' : 'Actualizar Stock'}
                        </button>
                  </div>
            </form>
      );
};

export default StockUpdateForm;
