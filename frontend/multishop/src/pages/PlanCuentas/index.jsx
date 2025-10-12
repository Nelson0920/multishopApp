import React, { useState, useEffect } from "react";
import { MdAccountBalance, MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import PlanCuentasModal from "./components/PlanCuentasModal";
import PlanCuentasListItem from "./components/PlanCuentasListItem";
import PlanCuentasCard from "./components/PlanCuentasCard";
import "./PlanCuentas.scss";
import PLANES_CUENTAS from "@mocks/PlanCuentas.json";

const PlanCuentas = () => {
      const [planesCuentas, setPlanesCuentas] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");
      const [filterCategory, setFilterCategory] = useState("");
      const categorias = ["otros", "activos", "pasivos", "gasto"];

      useEffect(() => {
            setPlanesCuentas(PLANES_CUENTAS);
      }, []);

      const currentPlanes = planesCuentas.slice(0, 15);

      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (plan) => {
            setIsEditMode(true);
            setEditingId(plan.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setPlanesCuentas(prev => prev.map(plan =>
                        plan.id === editingId
                              ? { ...plan, ...formData }
                              : plan
                  ));
            } else {
                  const newPlan = {
                        id: Date.now(),
                        ...formData,
                        fechaCreacion: new Date().toISOString().split('T')[0]
                  };
                  setPlanesCuentas(prev => [...prev, newPlan]);
            }

            handleCloseModal();
      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingId(null);
      };

      const getInitialData = () => {
            if (isEditMode && editingId) {
                  const plan = planesCuentas.find(p => p.id === editingId);
                  return plan ? {
                        codigo: plan.codigo,
                        nombre: plan.nombre,
                        auxiliarContable1: plan.auxiliarContable1,
                        auxiliarContable2: plan.auxiliarContable2,
                        categoria: plan.categoria
                  } : {
                        codigo: "",
                        nombre: "",
                        auxiliarContable1: "",
                        auxiliarContable2: "",
                        categoria: ""
                  };
            }
            return {
                  codigo: "",
                  nombre: "",
                  auxiliarContable1: "",
                  auxiliarContable2: "",
                  categoria: ""
            };
      };

      const getCategoryColor = (categoria) => {
            const colors = {
                  activos: "#27ae60",
                  pasivos: "#e74c3c",
                  gasto: "#f39c12",
                  otros: "#3498db"
            };
            return colors[categoria] || "#95a5a6";
      };

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="plan-cuentas-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdAccountBalance size={32} color="#36aad4" />
                                                      <h2>Gestión de Plan de Cuentas</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nuevo Plan
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
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>

                                                <div className="filter-container">
                                                      <select
                                                            value={filterCategory}
                                                            onChange={(e) => setFilterCategory(e.target.value)}
                                                            className="category-filter"
                                                      >
                                                            <option value="">Todas las categorías</option>
                                                            {categorias.map(cat => (
                                                                  <option key={cat} value={cat}>
                                                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="planes-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Código</th>
                                                                  <th>Nombre</th>
                                                                  <th>Categoría</th>
                                                                  <th>Auxiliar 1</th>
                                                                  <th>Auxiliar 2</th>
                                                                  <th>Fecha Creación</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentPlanes.map(plan => (
                                                                  <PlanCuentasListItem
                                                                        key={plan.id}
                                                                        plan={plan}
                                                                        onEdit={handleEdit}
                                                                        getCategoryColor={getCategoryColor}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {currentPlanes.map(plan => (
                                                      <PlanCuentasCard
                                                            key={plan.id}
                                                            plan={plan}
                                                            onEdit={handleEdit}
                                                            getCategoryColor={getCategoryColor}
                                                      />
                                                ))}
                                          </div>

                                          {currentPlanes.length === 0 && (
                                                <div className="no-results">
                                                      <MdAccountBalance size={48} color="#ccc" />
                                                      <p>No se encontraron planes de cuentas</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <PlanCuentasModal
                                          isOpen={isModalOpen}
                                          onClose={handleCloseModal}
                                          onSave={handleSave}
                                          isEditMode={isEditMode}
                                          initialData={getInitialData()}
                                    />
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default PlanCuentas;
