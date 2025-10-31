import React from 'react';
import { MdDelete, MdInventory, MdArrowUpward, MdArrowDownward, MdUnfoldMore, MdVisibility } from 'react-icons/md';
import InventarioAdapter from '@business/adapters/InventarioAdapter';

const InventarioTable = ({
      productos = [],
      onDelete,
      onUpdateStock,
      onViewDetails,
      loading = false,
      sortBy = 'nombre',
      sortOrder = 'asc',
      onSort
}) => {
      const handleSort = (field) => {
            if (onSort) {
                  const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
                  onSort(field, newOrder);
            }
      };

      const getSortIcon = (field) => {
            if (sortBy !== field) return <MdUnfoldMore size={16} />;
            return sortOrder === 'asc' ? <MdArrowUpward size={16} /> : <MdArrowDownward size={16} />;
      };

      const formatCurrency = (value) => {
            return InventarioAdapter.formatCurrency(value);
      };

      const getStockStatus = (stock, minStock) => {
            if (stock === 0) return { class: 'out-of-stock', text: 'Sin Stock' };
            if (stock < minStock) return { class: 'low-stock', text: 'Stock Bajo' };
            return { class: 'normal-stock', text: 'Normal' };
      };

      const getStatusBadge = (estado) => {
            const statusMap = {
                  'active': { class: 'status-active', text: 'Activo' },
                  'inactive': { class: 'status-inactive', text: 'Inactivo' },
                  'discontinued': { class: 'status-discontinued', text: 'Descontinuado' }
            };
            return statusMap[estado] || { class: 'status-unknown', text: 'Desconocido' };
      };

      if (loading) {
            return (
                  <div className="table-loading">
                        <div className="loading-spinner"></div>
                        <p>Cargando productos...</p>
                  </div>
            );
      }

      if (productos.length === 0) {
            return (
                  <div className="table-empty">
                        <p>No se encontraron productos</p>
                  </div>
            );
      }

      return (
            <div className="inventario-table-container">
                  <table className="inventario-table">
                        <thead>
                              <tr>
                                    <th
                                          className="sortable"
                                          onClick={() => handleSort('nombre')}
                                    >
                                          Nombre {getSortIcon('nombre')}
                                    </th>
                                    <th>Categoría</th>
                                    <th
                                          className="sortable"
                                          onClick={() => handleSort('precio')}
                                    >
                                          Precio {getSortIcon('precio')}
                                    </th>
                                    <th
                                          className="sortable"
                                          onClick={() => handleSort('costo')}
                                    >
                                          Costo {getSortIcon('costo')}
                                    </th>
                                    <th
                                          className="sortable"
                                          onClick={() => handleSort('stock')}
                                    >
                                          Stock {getSortIcon('stock')}
                                    </th>
                                    <th>Estado</th>
                                    <th>SKU</th>
                                    <th>Acciones</th>
                              </tr>
                        </thead>
                        <tbody>
                              {productos.map((producto) => {
                                    const stockStatus = getStockStatus(parseFloat(producto.existencia_general), parseFloat(producto.stock_minimo));
                                    const statusBadge = getStatusBadge(producto.estado);

                                    return (
                                          <tr key={producto.id} className={`product-row ${stockStatus.class}`}>
                                                <td className="product-name">
                                                      <div className="name-cell">
                                                            <strong
                                                                  title={producto.descripcion}
                                                                  className="product-name-text"
                                                            >
                                                                  {producto.descripcion}
                                                            </strong>
                                                            {producto.codigo && (
                                                                  <small className="description" title={`Código: ${producto.codigo}`}>
                                                                        Código: {producto.codigo}
                                                                  </small>
                                                            )}
                                                      </div>
                                                </td>
                                                <td className="category">
                                                      {producto.categoria || 'Sin categoría'}
                                                </td>
                                                <td className="price">
                                                      {formatCurrency(producto.precio1_con_impuesto)}
                                                </td>
                                                <td className="cost">
                                                      {formatCurrency(producto.precio1_sin_impuesto)}
                                                </td>
                                                <td className="stock">
                                                      <div className="stock-info">
                                                            <span className="current-stock">{producto.existencia_general}</span>
                                                            <small className="stock-range">
                                                                  Min: {producto.stock_minimo} | Max: {producto.stock_maximo}
                                                            </small>
                                                            <span className={`stock-status ${stockStatus.class}`}>
                                                                  {stockStatus.text}
                                                            </span>
                                                      </div>
                                                </td>
                                                <td className="status">
                                                      <span className={`status-badge ${statusBadge.class}`}>
                                                            {statusBadge.text}
                                                      </span>
                                                </td>
                                                <td className="sku">
                                                      {producto.codigo || '-'}
                                                </td>
                                                <td className="actions">
                                                      <div className="action-buttons">
                                                            <button
                                                                  onClick={() => onViewDetails(producto)}
                                                                  className="btn btn-sm btn-primary"
                                                                  title="Ver Detalles"
                                                            >
                                                                  <MdVisibility size={16} />
                                                            </button>
                                                            <button
                                                                  onClick={() => onUpdateStock(producto)}
                                                                  className="btn btn-sm btn-info"
                                                                  title="Actualizar Stock"
                                                            >
                                                                  <MdInventory size={16} />
                                                            </button>
                                                            <button
                                                                  onClick={() => onDelete(producto)}
                                                                  className="btn btn-sm btn-danger"
                                                                  title="Eliminar Producto"
                                                                  disabled={producto.estado === 'discontinued'}
                                                            >
                                                                  <MdDelete size={16} />
                                                            </button>
                                                      </div>
                                                </td>
                                          </tr>
                                    );
                              })}
                        </tbody>
                  </table>

                  <div className="table-footer">
                        <div className="table-info">
                              <p>Mostrando {productos.length} producto(s)</p>
                        </div>
                        <div className="table-summary">
                              <div className="summary-item">
                                    <span className="label">Valor Total:</span>
                                    <span className="value">
                                          {formatCurrency(
                                                productos.reduce((total, p) => total + (parseFloat(p.precio1_con_impuesto) * parseFloat(p.existencia_general)), 0)
                                          )}
                                    </span>
                              </div>
                              <div className="summary-item">
                                    <span className="label">Stock Bajo:</span>
                                    <span className="value warning">
                                          {productos.filter(p => parseFloat(p.existencia_general) < parseFloat(p.stock_minimo)).length}
                                    </span>
                              </div>
                              <div className="summary-item">
                                    <span className="label">Sin Stock:</span>
                                    <span className="value danger">
                                          {productos.filter(p => parseFloat(p.existencia_general) === 0).length}
                                    </span>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default InventarioTable;
