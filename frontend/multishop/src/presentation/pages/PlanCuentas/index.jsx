import React, { useCallback, useState } from "react";
import { PiChartBarFill } from "react-icons/pi";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import PlanCuentasModal from "./components/PlanCuentasModal";
import PlanCuentasListItem from "./components/PlanCuentasListItem";
import PlanCuentasCard from "./components/PlanCuentasCard";
import { usePlanCuentasOperations } from "@hooks/PlanCuentas/usePlanCuentas";
import { useDebounce } from "@shared/hooks/useDebounce";
import { SelectInput } from "@components/Common/Inputs";
import { formatAccountCode } from "@shared/utils/formatAccountCode";
import "./PlanCuentas.scss";
const PlanCuentas = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingCuenta, setEditingCuenta] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const [category, setCategory] = useState('');
      const categoriesOptions = [
            { value: 'A', label: 'Activos' },
            { value: 'P', label: 'Pasivos' },
            { value: 'O', label: 'Otros' },
            { value: 'G', label: 'Gasto' }
      ];
      const { debouncedValue } = useDebounce(searchTerm, 1000, 5);

      const { createCuenta, updateCuenta, cuentas, error, isLoading, refetch } = usePlanCuentasOperations({ searchTerm: debouncedValue, category: category, options: { enabled: true } });

      const handleCreateNew = () => {
            setEditingCuenta(null);
            setIsModalOpen(true);
      };

      const handleEdit = (cuenta) => {
            setEditingCuenta(cuenta);
            setIsModalOpen(true);
      };

      const handleSave = async (formData) => {
            if (editingCuenta) {
                  await updateCuenta(formData);
            } else {
                  await createCuenta(formData);
            }
            handleCloseModal();

      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setEditingCuenta(null);
      };

      const handleSearchChange = useCallback((e) => {
            const formattedValue = formatAccountCode(e.target.value);
            setSearchTerm(formattedValue);
      }, []);

      const handleCategoryChange = useCallback((e) => {
            setCategory(e.target.value);
      }, [setCategory]);

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="plan-cuentas-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <PiChartBarFill size={32} color="#36aad4" />
                                                      <h2>Gestión de Plan de Cuentas</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nueva Cuenta
                                                </button>
                                          </div>
                                    </div>

                                    <div className="table-container">
                                          <div className="table-header">
                                                <div className="search-container">
                                                      <div className="search-input-wrapper">
                                                            <MdSearch size={20} className="search-icon" />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Buscar por código o nombre..."
                                                                  value={searchTerm}
                                                                  onChange={handleSearchChange}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                      <div className="search-input-wrapper">
                                                            <SelectInput
                                                                  id="category"
                                                                  name="category"
                                                                  placeholder="Todos"
                                                                  options={categoriesOptions}
                                                                  value={category}
                                                                  onChange={handleCategoryChange}
                                                                  className="category-search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="table-wrapper">
                                                <table className="plan-cuentas-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Código</th>
                                                                  <th>Nombre</th>
                                                                  <th>Auxiliar 1</th>
                                                                  <th>Auxiliar 2</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {cuentas && cuentas.length > 0 && cuentas.map(cuenta => (
                                                                  <PlanCuentasListItem
                                                                        key={cuenta.id}
                                                                        cuenta={cuenta}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {cuentas && cuentas.length > 0 && cuentas.map(cuenta => (
                                                      <PlanCuentasCard
                                                            key={cuenta.id}
                                                            cuenta={cuenta}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {cuentas && cuentas.length === 0 && (
                                                <div className="no-results">
                                                      <PiChartBarFill size={48} color="#ccc" />
                                                      <p>
                                                            {searchTerm.trim() && searchTerm.length < 3
                                                                  ? `Escribe al menos 3 caracteres para buscar`
                                                                  : searchTerm.trim()
                                                                        ? `No se encontraron cuentas que coincidan con "${searchTerm}"`
                                                                        : "No se encontraron cuentas en el plan"
                                                            }
                                                      </p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Indicadores de estado */}
                                    {isLoading && (
                                          <div className="loading-indicator">
                                                <p>Cargando cuentas...</p>
                                          </div>
                                    )}

                                    {error && (
                                          <div className="error-indicator">
                                                <p>Error: {error.message}</p>
                                                <button onClick={() => refetch()}>Reintentar</button>
                                          </div>
                                    )}

                                    {/* Modal para crear/editar */}
                                    <PlanCuentasModal
                                          isOpen={isModalOpen}
                                          editingCuenta={editingCuenta}
                                          onClose={handleCloseModal}
                                          onSave={handleSave}
                                    />
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default PlanCuentas;

