import React, { useState } from 'react';
import SelectInput from '../Common/Inputs/SelectInput';
import SearchInput from './SearchInput';

const InventarioFilters = ({
      onFilterChange,
      categories = [],
      loading = false
}) => {
      const [filters, setFilters] = useState({
            search: '',
            categoria: '',
            estado: '',
            stockBajo: ''
      });

      const handleFilterChange = (name, value) => {
            const newFilters = {
                  ...filters,
                  [name]: value
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
      };

      const handleSearchChange = (value) => {
            handleFilterChange('search', value);
      };

      const clearFilters = () => {
            const clearedFilters = {
                  search: '',
                  categoria: '',
                  estado: '',
                  stockBajo: ''
            };
            setFilters(clearedFilters);
            onFilterChange(clearedFilters);
      };

      const categoryOptions = categories.map(cat => ({
            value: cat.id,
            label: cat.name
      }));

      const statusOptions = [
            { value: '', label: 'Todos los estados' },
            { value: 'active', label: 'Activo' },
            { value: 'inactive', label: 'Inactivo' },
            { value: 'discontinued', label: 'Descontinuado' }
      ];

      const stockOptions = [
            { value: '', label: 'Todos los productos' },
            { value: 'true', label: 'Solo stock bajo' },
            { value: 'false', label: 'Solo stock normal' }
      ];

      const hasActiveFilters = Object.values(filters).some(value =>
            value !== '' && value !== null && value !== undefined
      );

      return (
            <div className="inventario-filters">
                  <div className="filters-header">
                        <h3>Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                              <button
                                    onClick={clearFilters}
                                    className="btn btn-link clear-filters"
                                    disabled={loading}
                              >
                                    Limpiar Filtros
                              </button>
                        )}
                  </div>

                  <div className="filters-grid">
                        <div className="filter-group">
                              <SearchInput
                                    id="search"
                                    name="search"
                                    label="Buscar productos"
                                    placeholder="Buscar por nombre, SKU o código de barras..."
                                    onSearch={handleSearchChange}
                                    loading={loading}
                                    className="search-filter"
                              />
                        </div>

                        <div className="filter-group">
                              <SelectInput
                                    id="categoria"
                                    name="categoria"
                                    label="Categoría"
                                    value={filters.categoria}
                                    onChange={(e) => handleFilterChange('categoria', e.target.value)}
                                    options={categoryOptions}
                                    placeholder="Todas las categorías"
                                    className="filter-select"
                                    disabled={loading}
                              />
                        </div>

                        <div className="filter-group">
                              <SelectInput
                                    id="estado"
                                    name="estado"
                                    label="Estado"
                                    value={filters.estado}
                                    onChange={(e) => handleFilterChange('estado', e.target.value)}
                                    options={statusOptions}
                                    className="filter-select"
                                    disabled={loading}
                              />
                        </div>

                        <div className="filter-group">
                              <SelectInput
                                    id="stockBajo"
                                    name="stockBajo"
                                    label="Stock"
                                    value={filters.stockBajo}
                                    onChange={(e) => handleFilterChange('stockBajo', e.target.value)}
                                    options={stockOptions}
                                    className="filter-select"
                                    disabled={loading}
                              />
                        </div>
                  </div>

                  {hasActiveFilters && (
                        <div className="active-filters">
                              <h4>Filtros Activos:</h4>
                              <div className="filter-tags">
                                    {filters.search && (
                                          <span className="filter-tag">
                                                Búsqueda: "{filters.search}"
                                          </span>
                                    )}
                                    {filters.categoria && (
                                          <span className="filter-tag">
                                                Categoría: {categories.find(c => c.id === filters.categoria)?.name || filters.categoria}
                                          </span>
                                    )}
                                    {filters.estado && (
                                          <span className="filter-tag">
                                                Estado: {statusOptions.find(s => s.value === filters.estado)?.label || filters.estado}
                                          </span>
                                    )}
                                    {filters.stockBajo && (
                                          <span className="filter-tag">
                                                Stock: {stockOptions.find(s => s.value === filters.stockBajo)?.label || filters.stockBajo}
                                          </span>
                                    )}
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default InventarioFilters;
