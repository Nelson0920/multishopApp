import React, { useState, useEffect } from "react";
import { MdArrowBack, MdInventory, MdEdit, MdTrendingUp, MdTrendingDown, MdStorage, MdSettings, MdAttachMoney, MdAccountBalanceWallet, MdAssessment, MdShoppingCart, MdReceipt, MdLocalShipping, MdSearch, MdImage, MdCompare, MdSchedule } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import NavbarSidebar from "@components/NavbarSidebar";
import InventarioModal from "./components/InventarioModal";
import "./InventarioDetails.scss";
import INVENTARIO_DATA from "@mocks/Inventario.json";

const InventarioDetails = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [producto, setProducto] = useState(null);
      const [activeTab, setActiveTab] = useState('existencias');
      const [isLoading, setIsLoading] = useState(true);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [editingProducto, setEditingProducto] = useState(null);

      useEffect(() => {
            const loadProducto = async () => {
                  setIsLoading(true);
                  try {
                        // Simular carga de datos
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        const productoEncontrado = INVENTARIO_DATA.find(item => item.id === id);
                        if (productoEncontrado) {
                              setProducto(productoEncontrado);
                        } else {
                              setProducto(null);
                        }
                  } catch (error) {
                        console.error('Error cargando producto:', error);
                        setProducto(null);
                  } finally {
                        setIsLoading(false);
                  }
            };

            if (id) {
                  loadProducto();
            }
      }, [id]);

      const handleBack = () => {
            navigate('/inventario');
      };

      const handleEditProducto = () => {
            setEditingProducto(producto);
            setIsEditModalOpen(true);
      };

      const handleSaveProducto = (productoData) => {
            console.log('Guardando producto:', productoData);
            // Aquí iría la lógica para guardar el producto
            setIsEditModalOpen(false);
            setEditingProducto(null);
      };

      const handleCloseEditModal = () => {
            setIsEditModalOpen(false);
            setEditingProducto(null);
      };

      const getStockStatus = (stock) => {
            if (stock <= 0) return { status: 'out-of-stock', label: 'Sin Stock', color: '#dc3545' };
            if (stock <= 50) return { status: 'low-stock', label: 'Stock Bajo', color: '#ffc107' };
            return { status: 'normal-stock', label: 'Stock Normal', color: '#28a745' };
      };

      const getRotacionStatus = (rotacion) => {
            if (rotacion >= 1.5) return { status: 'high', label: 'Alta Rotación', color: '#28a745' };
            if (rotacion >= 0.5) return { status: 'medium', label: 'Rotación Media', color: '#ffc107' };
            return { status: 'low', label: 'Baja Rotación', color: '#dc3545' };
      };

      if (isLoading) {
            return (
                  <NavbarSidebar>
                        <div className="page-container">
                              <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Cargando detalles del producto...</p>
                              </div>
                        </div>
                  </NavbarSidebar>
            );
      }

      if (!producto) {
            return (
                  <NavbarSidebar>
                        <div className="page-container">
                              <div className="error-container">
                                    <MdInventory size={48} color="#ff6b6b" />
                                    <h2>Producto no encontrado</h2>
                                    <p>El producto que buscas no existe o ha sido eliminado.</p>
                                    <button className="btn-primary" onClick={handleBack}>
                                          Volver a la lista
                                    </button>
                              </div>
                        </div>
                  </NavbarSidebar>
            );
      }

      const stockStatus = getStockStatus(producto.existencia_general);
      const rotacionStatus = getRotacionStatus(producto.rotacion);

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <div className="inventario-details-page">
                              {/* Header */}
                              <div className="details-header">
                                    <div className="header-actions">
                                          <button className="btn-back" onClick={handleBack}>
                                                <MdArrowBack size={20} />
                                                Volver
                                          </button>
                                          <button className="btn-edit" onClick={handleEditProducto}>
                                                <MdEdit size={20} />
                                                Editar Producto
                                          </button>
                                    </div>

                                    <div className="producto-info">
                                          <div className="producto-icon">
                                                <MdInventory size={48} color="#36aad4" />
                                          </div>
                                          <div className="producto-details">
                                                <h1>{producto.descripcion}</h1>
                                                <div className="producto-meta">
                                                      <span className="codigo">Código: {producto.codigo}</span>
                                                      <span className="categoria">Categoría: {producto.categoria}</span>
                                                      <span className="proveedor">Proveedor: {producto.proveedor}</span>
                                                </div>
                                                <div className="producto-status">
                                                      <span className={`status-badge ${stockStatus.status}`}>
                                                            {stockStatus.label}
                                                      </span>
                                                      <span className={`rotacion-badge ${rotacionStatus.status}`}>
                                                            {rotacionStatus.label}
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* Tabs */}
                              <div className="tabs-container">
                                    <div className="tabs-header">
                                          <button
                                                className={`tab-button ${activeTab === 'existencias' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('existencias')}
                                          >
                                                <MdStorage size={20} />
                                                Existencias y Stocks
                                          </button>
                                          <button
                                                className={`tab-button ${activeTab === 'complementos' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('complementos')}
                                          >
                                                <MdSettings size={20} />
                                                Complementos
                                          </button>
                                          <button
                                                className={`tab-button ${activeTab === 'bottom-bar' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('bottom-bar')}
                                          >
                                                <MdTrendingUp size={20} />
                                                Información General
                                          </button>
                                    </div>

                                    <div className="tab-content">
                                          {activeTab === 'existencias' && (
                                                <div className="existencias-tab">
                                                      <div className="section-card">
                                                            <h3>
                                                                  <MdStorage size={24} />
                                                                  Existencias y Manejo de Stocks
                                                            </h3>

                                                            <div className="info-grid">
                                                                  <div className="info-item">
                                                                        <label>Existencia General</label>
                                                                        <span className="value highlight">{producto.existencia_general}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Rotación</label>
                                                                        <span className="value">{producto.rotacion}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Rotación cada</label>
                                                                        <span className="value">{producto.rotacion_cada_dias} días</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Días de Inventario</label>
                                                                        <span className="value">{producto.dias_inventario}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Venta Diaria Promedio (Base a {producto.venta_diaria_base_dias} días)</label>
                                                                        <span className="value">{producto.venta_diaria_promedio}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Valores Estimados - Semanal</label>
                                                                        <span className="value">{producto.valores_estimados_semanal}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Stock Mínimo en {producto.stock_minimo_dias} días</label>
                                                                        <span className="value warning">{producto.stock_minimo}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Stock Máximo en {producto.stock_maximo_dias} días</label>
                                                                        <span className="value success">{producto.stock_maximo}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Venta Media Diaria (Base a {producto.venta_media_base_dias} días)</label>
                                                                        <span className="value">{producto.venta_media_diaria}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Última Actualización</label>
                                                                        <span className="value">{producto.ultima_actualizacion}</span>
                                                                  </div>
                                                            </div>

                                                            <div className="checkbox-section">
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.excluir_calculo_rotacion}
                                                                              readOnly
                                                                        />
                                                                        <span>Excluir el Producto de los Procesos Automatizados de Cálculo de Rotación</span>
                                                                  </label>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}

                                          {activeTab === 'complementos' && (
                                                <div className="complementos-tab">
                                                      <div className="section-card">
                                                            <h3>
                                                                  <MdSettings size={24} />
                                                                  Complementos
                                                            </h3>

                                                            <div className="info-grid">
                                                                  <div className="info-item">
                                                                        <label>Fecha de Creación</label>
                                                                        <span className="value">{producto.fecha_creacion}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>En Promoción</label>
                                                                        <span className="value">{producto.en_promocion}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Última Venta</label>
                                                                        <span className="value">{producto.ultima_venta}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Pesado o Fraccionado</label>
                                                                        <span className="value">{producto.pesado_fraccionado}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Fecha Última Compra</label>
                                                                        <span className="value">{producto.fecha_ultima_compra}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Fecha de Confirmación</label>
                                                                        <span className="value">{producto.fecha_confirmacion}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Cantidad Comprada</label>
                                                                        <span className="value">{producto.cantidad_comprada}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Producto en Catálogo de Oferta</label>
                                                                        <span className="value">{producto.producto_catalogo_oferta}</span>
                                                                  </div>
                                                            </div>

                                                            <div className="checkbox-section">
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.producto_inactivo}
                                                                              readOnly
                                                                        />
                                                                        <span>Producto Inactivo</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.en_inventario}
                                                                              readOnly
                                                                        />
                                                                        <span>En Inventario</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.aplica_cadena_frio}
                                                                              readOnly
                                                                        />
                                                                        <span>Aplica - Cadena de Frío</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.bloqueo_cedula}
                                                                              readOnly
                                                                        />
                                                                        <span>Bloqueo por Cédula</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.hablador_prc_justo}
                                                                              readOnly
                                                                        />
                                                                        <span>Hablador PRC.Justo</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.requiere_recipe}
                                                                              readOnly
                                                                        />
                                                                        <span>Requiere Recipe</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.no_aplica_bandas}
                                                                              readOnly
                                                                        />
                                                                        <span>No Aplica p/Bandas</span>
                                                                  </label>
                                                                  <label className="checkbox-item">
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={producto.descontinuado}
                                                                              readOnly
                                                                        />
                                                                        <span>Descontinuado</span>
                                                                  </label>
                                                            </div>

                                                            <div className="button-section">
                                                                  <button className="btn-secondary">
                                                                        Incluir Códigos Alternos
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}

                                          {activeTab === 'bottom-bar' && (
                                                <div className="bottom-bar-tab">
                                                      <div className="section-card">
                                                            <h3>
                                                                  <MdAssessment size={24} />
                                                                  Información General
                                                            </h3>

                                                            <div className="info-grid">
                                                                  <div className="info-item">
                                                                        <label>Fecha Actual</label>
                                                                        <span className="value">{producto.fecha_actual}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Registro Encontrado</label>
                                                                        <span className="value">{producto.registro_encontrado}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Total de Registros</label>
                                                                        <span className="value highlight">{producto.total_registros}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Última Actualización General</label>
                                                                        <span className="value">{producto.ultima_actualizacion_general}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Valorización en Costo Promedio</label>
                                                                        <span className="value success">{producto.valorizacion_costo_promedio}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Días de Inventario</label>
                                                                        <span className="value">{producto.dias_inventario_general}</span>
                                                                  </div>
                                                                  <div className="info-item">
                                                                        <label>Rotación de Inventario</label>
                                                                        <span className="value">{producto.rotacion_inventario}</span>
                                                                  </div>
                                                            </div>

                                                            <div className="criterios-section">
                                                                  <h4>Criterios de Búsqueda</h4>
                                                                  <div className="criterios-grid">
                                                                        <div className="criterios-group">
                                                                              <label className="checkbox-item">
                                                                                    <input
                                                                                          type="checkbox"
                                                                                          checked={producto.criterios_activos}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Activos</span>
                                                                              </label>
                                                                              <label className="checkbox-item">
                                                                                    <input
                                                                                          type="checkbox"
                                                                                          checked={producto.criterios_con_existencia}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Con Existencia</span>
                                                                              </label>
                                                                              <label className="checkbox-item">
                                                                                    <input
                                                                                          type="checkbox"
                                                                                          checked={producto.criterios_menos_exacta}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Menos Exacta</span>
                                                                              </label>
                                                                        </div>
                                                                        <div className="criterios-group">
                                                                              <div className="info-item">
                                                                                    <label>Moneda</label>
                                                                                    <span className="value">{producto.moneda}</span>
                                                                              </div>
                                                                        </div>
                                                                        <div className="criterios-group">
                                                                              <h5>Buscar Por:</h5>
                                                                              <label className="radio-item">
                                                                                    <input
                                                                                          type="radio"
                                                                                          checked={producto.buscar_por_codigo}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Código</span>
                                                                              </label>
                                                                              <label className="radio-item">
                                                                                    <input
                                                                                          type="radio"
                                                                                          checked={producto.buscar_por_nombre}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Nombre</span>
                                                                              </label>
                                                                              <label className="radio-item">
                                                                                    <input
                                                                                          type="radio"
                                                                                          checked={producto.buscar_por_barra}
                                                                                          readOnly
                                                                                    />
                                                                                    <span>Barra</span>
                                                                              </label>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="action-buttons-section">
                                    <h3>
                                          <MdTrendingUp size={24} />
                                          Acciones Disponibles
                                    </h3>
                                    <div className="action-buttons-grid">
                                          <button className="action-btn">
                                                <MdShoppingCart size={24} />
                                                Compras
                                          </button>
                                          <button className="action-btn">
                                                <MdStorage size={24} />
                                                Kardex
                                          </button>
                                          <button className="action-btn">
                                                <MdInventory size={24} />
                                                Lotes
                                          </button>
                                          <button className="action-btn">
                                                <MdSettings size={24} />
                                                Propiedades
                                          </button>
                                          <button className="action-btn">
                                                <MdSearch size={24} />
                                                Búsquedas
                                          </button>
                                          <button className="action-btn">
                                                <MdLocalShipping size={24} />
                                                Depósitos
                                          </button>
                                          <button className="action-btn">
                                                <MdInventory size={24} />
                                                Compuestos
                                          </button>
                                          <button className="action-btn">
                                                <MdSettings size={24} />
                                                Otros Datos
                                          </button>
                                          <button className="action-btn">
                                                <MdTrendingUp size={24} />
                                                Referenciales
                                          </button>
                                          <button className="action-btn">
                                                <MdImage size={24} />
                                                Imagen
                                          </button>
                                          <button className="action-btn">
                                                <MdSchedule size={24} />
                                                Vencimiento
                                          </button>
                                          <button className="action-btn">
                                                <MdCompare size={24} />
                                                Comparar
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* Modal de Edición */}
                        <InventarioModal
                              isOpen={isEditModalOpen}
                              onClose={handleCloseEditModal}
                              onSave={handleSaveProducto}
                              isEditMode={true}
                              editingProducto={editingProducto}
                              isLoading={false}
                        />
                  </div>
            </NavbarSidebar>
      );
};

export default InventarioDetails;
