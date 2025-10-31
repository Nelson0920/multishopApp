import React, { useState } from 'react';
import { MdInventory, MdBarChart, MdAdd, MdError, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '@components/NavbarSidebar';
import useInventario from '../../hooks/Inventario/useInventario';
import InventarioForm from '../../components/Inventario/InventarioForm';
import InventarioTable from '../../components/Inventario/InventarioTable';
import InventarioFilters from '../../components/Inventario/InventarioFilters';
import InventarioStatistics from '../../components/Inventario/InventarioStatistics';
import StockUpdateForm from '../../components/Inventario/StockUpdateForm';
import { ModalHeader, ModalActions } from '../../components/Common/Inputs';
import '@presentation-styles/inventario.scss';

const Inventario = () => {
      const navigate = useNavigate();
      const {
            productos,
            loading,
            error,
            statistics,
            categories,
            loadProductos,
            createProducto,
            deleteProducto,
            updateStock,
            clearError
      } = useInventario();

      const [showCreateModal, setShowCreateModal] = useState(false);
      const [showStockModal, setShowStockModal] = useState(false);
      const [showStatistics, setShowStatistics] = useState(false);
      const [selectedProducto, setSelectedProducto] = useState(null);
      const [sortBy, setSortBy] = useState('descripcion');
      const [sortOrder, setSortOrder] = useState('asc');

      const handleFilterChange = (newFilters) => {
            loadProductos(newFilters);
      };

      const handleSort = (field, order) => {
            setSortBy(field);
            setSortOrder(order);
            // Aquí podrías implementar la lógica de ordenamiento
            // Por ahora solo actualizamos el estado
      };

      const handleCreate = async (productoData) => {
            try {
                  await createProducto(productoData);
                  setShowCreateModal(false);
                  clearError();
            } catch (err) {
                  console.error('Error creating producto:', err);
            }
      };

      const handleDelete = async (producto) => {
            if (window.confirm(`¿Está seguro de que desea eliminar el producto "${producto.descripcion}"?`)) {
                  try {
                        await deleteProducto(producto.id);
                        clearError();
                  } catch (err) {
                        console.error('Error deleting producto:', err);
                  }
            }
      };

      const handleViewDetails = (producto) => {
            navigate(`/inventario/${producto.id}`);
      };

      const handleUpdateStock = async (stockData) => {
            try {
                  await updateStock(stockData);
                  setShowStockModal(false);
                  setSelectedProducto(null);
                  clearError();
            } catch (err) {
                  console.error('Error updating stock:', err);
            }
      };

      const openStockModal = (producto) => {
            setSelectedProducto(producto);
            setShowStockModal(true);
      };

      const closeModals = () => {
            setShowCreateModal(false);
            setShowStockModal(false);
            setSelectedProducto(null);
            clearError();
      };

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="inventario-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdInventory size={32} color="#36aad4" />
                                                      <h2>Gestión de Inventario</h2>
                                                </div>
                                                <div className="header-actions">
                                                      <button
                                                            onClick={() => setShowStatistics(!showStatistics)}
                                                            className="btn btn-info"
                                                      >
                                                            <MdBarChart size={20} />
                                                            Estadísticas
                                                      </button>
                                                      <button
                                                            onClick={() => setShowCreateModal(true)}
                                                            className="btn btn-primary"
                                                      >
                                                            <MdAdd size={20} />
                                                            Nuevo Producto
                                                      </button>
                                                </div>
                                          </div>
                                    </div>

                                    {error && (
                                          <div className="error-banner">
                                                <span>
                                                      <MdError size={20} />
                                                      {error}
                                                </span>
                                                <button onClick={clearError} className="btn btn-sm btn-link">
                                                      <MdClose size={16} />
                                                </button>
                                          </div>
                                    )}

                                    {showStatistics && (
                                          <div className="statistics-section">
                                                <InventarioStatistics
                                                      statistics={statistics}
                                                      loading={loading}
                                                />
                                          </div>
                                    )}

                                    <div className="filters-section">
                                          <InventarioFilters
                                                onFilterChange={handleFilterChange}
                                                categories={categories}
                                                loading={loading}
                                          />
                                    </div>

                                    <div className="table-section">
                                          <InventarioTable
                                                productos={productos}
                                                onDelete={handleDelete}
                                                onUpdateStock={openStockModal}
                                                onViewDetails={handleViewDetails}
                                                loading={loading}
                                                sortBy={sortBy}
                                                sortOrder={sortOrder}
                                                onSort={handleSort}
                                          />
                                    </div>

                                    {/* Modal de Creación */}
                                    {showCreateModal && (
                                          <div className="modal-overlay">
                                                <div className="modal">
                                                      <ModalHeader
                                                            title="Crear Nuevo Producto"
                                                            onClose={closeModals}
                                                      />
                                                      <div className="modal-body">
                                                            <InventarioForm
                                                                  onSubmit={handleCreate}
                                                                  onCancel={closeModals}
                                                                  categories={categories}
                                                                  loading={loading}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    )}

                                    {/* Modal de Actualización de Stock */}
                                    {showStockModal && selectedProducto && (
                                          <div className="modal-overlay">
                                                <div className="modal">
                                                      <ModalHeader
                                                            title="Actualizar Stock"
                                                            onClose={closeModals}
                                                      />
                                                      <div className="modal-body">
                                                            <StockUpdateForm
                                                                  producto={selectedProducto}
                                                                  onSubmit={handleUpdateStock}
                                                                  onCancel={closeModals}
                                                                  loading={loading}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default Inventario;