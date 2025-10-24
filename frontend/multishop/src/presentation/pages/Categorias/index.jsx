import React, { useState } from "react";
import { MdCategory } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import CategoriasModal from "./components/CategoriasModal";
import CategoriasListItem from "./components/CategoriasListItem";
import CategoriasCard from "./components/CategoriasCard";
import { useCategoriasOperations } from "@hooks/Categorias/useCategorias";
import "./Categorias.scss";

const Categorias = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      const {
            categorias,
            isLoading,
            isError,
            error,
            createCategoria,
            updateCategoria,
            refetch
      } = useCategoriasOperations({
            options: {},
            searchTerm
      });


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

      const handleSave = async (formData) => {
            try {
                  if (isEditMode) {
                        await updateCategoria({ ...formData, id: editingId });
                  } else {
                        await createCategoria(formData);
                  }
                  handleCloseModal();
            } catch (error) {
                  console.error('Error al guardar categoría:', error);
            }
      };

      const filteredCategorias = categorias.filter(categoria =>
            categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            categoria.margenGanancia.toLowerCase().includes(searchTerm.toLowerCase()) ||
            categoria.porcentajeComision.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const currentCategorias = filteredCategorias.slice(0, 20);

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingId(null);
      };

      const getInitialData = () => {
            if (isEditMode && editingId) {
                  const categoria = categorias.find(c => c.id === editingId);
                  return categoria ? {
                        nombre: categoria.nombre,
                        margenGanancia: categoria.margenGanancia,
                        porcentajeComision: categoria.porcentajeComision,
                        cuentaVentas: categoria.cuentaVentas,
                        cuentaCompras: categoria.cuentaCompras,
                        cuentaConsumos: categoria.cuentaConsumos,
                        cuentaDevCompras: categoria.cuentaDevCompras,
                        cuentaIVA: categoria.cuentaIVA,
                        auxiliarCompras: categoria.auxiliarCompras,
                        auxiliarConsumos: categoria.auxiliarConsumos,
                        auxiliarDevCompras: categoria.auxiliarDevCompras,
                        auxiliarIVA: categoria.auxiliarIVA,
                        auxiliarIVA2: categoria.auxiliarIVA2
                  } : {
                        nombre: "",
                        margenGanancia: "",
                        porcentajeComision: "",
                        cuentaVentas: "",
                        cuentaCompras: "",
                        cuentaConsumos: "",
                        cuentaDevCompras: "",
                        cuentaIVA: "",
                        auxiliarCompras: "",
                        auxiliarConsumos: "",
                        auxiliarDevCompras: "",
                        auxiliarIVA: "",
                        auxiliarIVA2: ""
                  };
            }
            return {
                  nombre: "",
                  margenGanancia: "",
                  porcentajeComision: "",
                  cuentaVentas: "",
                  cuentaCompras: "",
                  cuentaConsumos: "",
                  cuentaDevCompras: "",
                  cuentaIVA: "",
                  auxiliarCompras: "",
                  auxiliarConsumos: "",
                  auxiliarDevCompras: "",
                  auxiliarIVA: "",
                  auxiliarIVA2: ""
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
                                                      <h2>Gestión de Categorías</h2>
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
                                                                  placeholder="Buscar por nombre, margen o comisión..."
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
                                                                  <th>Margen</th>
                                                                  <th>Comisión</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentCategorias.map(categoria => (
                                                                  <CategoriasListItem
                                                                        key={categoria.id}
                                                                        categoria={categoria}
                                                                        onEdit={handleEdit}
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

                                    {/* Indicadores de estado */}
                                    {isLoading && (
                                          <div className="loading-indicator">
                                                <p>Cargando categorías...</p>
                                          </div>
                                    )}

                                    {isError && (
                                          <div className="error-indicator">
                                                <p>Error: {error?.message}</p>
                                                <button onClick={() => refetch()}>Reintentar</button>
                                          </div>
                                    )}

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
