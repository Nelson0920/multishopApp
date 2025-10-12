import React, { useState, useEffect } from "react";
import { MdCategory } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import CategoriasModal from "./components/CategoriasModal";
import CategoriasListItem from "./components/CategoriasListItem";
import CategoriasCard from "./components/CategoriasCard";
import "./Categorias.scss";
import CATEGORIAS_CPO from "@mocks/CategoriasCPO.json";
import PLAN_CUENTAS from "@mocks/PlanCuentas.json";
import AUXILIARES from "@mocks/Auxiliares.json";

const Categorias = () => {
      const [categorias, setCategorias] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
            const categoriasWithIds = CATEGORIAS_CPO.map((categoria, index) => ({
                  ...categoria,
                  id: index + 1
            }));
            setCategorias(categoriasWithIds);
      }, []);


      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (categoria) => {
            setIsEditMode(true);
            setEditingId(categoria.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setCategorias(prev => prev.map(categoria =>
                        categoria.id === editingId
                              ? { ...categoria, ...formData }
                              : categoria
                  ));
            } else {
                  const newCategoria = {
                        id: Date.now(),
                        ...formData
                  };
                  setCategorias(prev => [...prev, newCategoria]);
            }

            handleCloseModal();
      };

      const currentCategorias = categorias.slice(0, 20);

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingId(null);
      };

      const getInitialData = () => {
            if (isEditMode && editingId) {
                  const categoria = categorias.find(c => c.id === editingId);
                  return categoria ? {
                        name: categoria.name,
                        credit_limit: categoria.credit_limit,
                        credit_terms: categoria.credit_terms,
                        discount_percentage: categoria.discount_percentage,
                        plan_cuentas_id: categoria.plan_cuentas_id,
                        auxiliary1_id: categoria.auxiliary1_id,
                        auxiliary2_id: categoria.auxiliary2_id,
                        createdAt: categoria.createdAt,
                        deadline_day: categoria.deadline_day
                  } : {
                        name: "",
                        credit_limit: "",
                        credit_terms: "",
                        discount_percentage: "",
                        plan_cuentas_id: "",
                        auxiliary1_id: "",
                        auxiliary2_id: "",
                        createdAt: "",
                        deadline_day: ""
                  };
            }
            return {
                  name: "",
                  credit_limit: "",
                  credit_terms: "",
                  discount_percentage: "",
                  plan_cuentas_id: "",
                  auxiliary1_id: "",
                  auxiliary2_id: "",
                  createdAt: "",
                  deadline_day: ""
            };
      };


      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="categorias-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdCategory size={32} color="#36aad4" />
                                                      <h2>Gestión de Categorías CPO</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nueva Categoría
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
                                                                  placeholder="Buscar por nombre, límite de crédito o descuento..."
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="categorias-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Nombre</th>
                                                                  <th>Límite Crédito</th>
                                                                  <th>Términos</th>
                                                                  <th>Descuento</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentCategorias.map(categoria => (
                                                                  <CategoriasListItem
                                                                        key={categoria.id}
                                                                        categoria={categoria}
                                                                        onEdit={handleEdit}
                                                                        planCuentas={PLAN_CUENTAS}
                                                                        auxiliares={AUXILIARES}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {currentCategorias.map(categoria => (
                                                      <CategoriasCard
                                                            key={categoria.id}
                                                            categoria={categoria}
                                                            onEdit={handleEdit}
                                                            planCuentas={PLAN_CUENTAS}
                                                            auxiliares={AUXILIARES}
                                                      />
                                                ))}
                                          </div>

                                          {currentCategorias.length === 0 && (
                                                <div className="no-results">
                                                      <MdCategory size={48} color="#ccc" />
                                                      <p>No se encontraron categorías</p>
                                                </div>
                                          )}
                                    </div>


                                    {/* Modal para crear/editar */}
                                    <CategoriasModal
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

export default Categorias;
