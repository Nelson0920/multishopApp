import React from 'react';
import InventarioAdapter from '@business/adapters/InventarioAdapter';

const InventarioStatistics = ({
      statistics = {},
      loading = false
}) => {
      if (loading) {
            return (
                  <div className="statistics-loading">
                        <div className="loading-spinner"></div>
                        <p>Cargando estadísticas...</p>
                  </div>
            );
      }

      const adaptedStats = InventarioAdapter.adaptStatistics(statistics);

      const StatCard = ({ title, value, icon, className = '', trend = null }) => (
            <div className={`stat-card ${className}`}>
                  <div className="stat-icon">{icon}</div>
                  <div className="stat-content">
                        <h3 className="stat-title">{title}</h3>
                        <p className="stat-value">{value}</p>
                        {trend && (
                              <span className={`stat-trend ${trend.type}`}>
                                    {trend.icon} {trend.value}
                              </span>
                        )}
                  </div>
            </div>
      );

      return (
            <div className="inventario-statistics">
                  <h2>Estadísticas del Inventario</h2>

                  <div className="statistics-grid">
                        <StatCard
                              title="Total de Productos"
                              value={adaptedStats.totalProductos}
                              icon="📦"
                              className="primary"
                        />

                        <StatCard
                              title="Productos Activos"
                              value={adaptedStats.productosActivos}
                              icon="✅"
                              className="success"
                        />

                        <StatCard
                              title="Productos Inactivos"
                              value={adaptedStats.productosInactivos}
                              icon="⏸️"
                              className="warning"
                        />

                        <StatCard
                              title="Valor Total del Inventario"
                              value={adaptedStats.valorTotalInventario}
                              icon="💰"
                              className="info"
                        />

                        <StatCard
                              title="Productos con Stock Bajo"
                              value={adaptedStats.productosStockBajo}
                              icon="⚠️"
                              className="warning"
                        />

                        <StatCard
                              title="Productos Sin Stock"
                              value={adaptedStats.productosSinStock}
                              icon="❌"
                              className="danger"
                        />
                  </div>

                  <div className="statistics-details">
                        <div className="detail-section">
                              <h3>Información Adicional</h3>
                              <div className="detail-grid">
                                    <div className="detail-item">
                                          <span className="detail-label">Categoría con más productos:</span>
                                          <span className="detail-value">{adaptedStats.categoriaMasProductos}</span>
                                    </div>
                                    <div className="detail-item">
                                          <span className="detail-label">Última actualización:</span>
                                          <span className="detail-value">
                                                {new Date(adaptedStats.ultimaActualizacion).toLocaleString('es-VE')}
                                          </span>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="statistics-actions">
                        <button className="btn btn-primary">
                              📊 Ver Reporte Detallado
                        </button>
                        <button className="btn btn-secondary">
                              📤 Exportar Datos
                        </button>
                        <button className="btn btn-info">
                              🔄 Actualizar Estadísticas
                        </button>
                  </div>
            </div>
      );
};

export default InventarioStatistics;
