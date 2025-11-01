import React, { useState } from "react";
import { MdCategory } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import CategoriasModal from "./components/CategoriasModal";
import CategoriasListItem from "./components/CategoriasListItem";
import CategoriasCard from "./components/CategoriasCard";
import { useCategoriasCPOOperations } from "@hooks/CategoriasCPO/useCategoriasCPO";
import "./Categorias.scss";
import { CheckboxInput } from "@components/Common/Inputs";
import { useDebounce } from "@shared/hooks/useDebounce";

const Categorias = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingCategoria, setEditingCategoria] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");
      const { debouncedValue: debouncedSearch } = useDebounce(searchTerm, 1000);
      const [orderByEndDate, setOrderByEndDate] = useState(false);

      const {
            categoriasCPO,
            isLoading,
            isError,
            error,
            createCategoriaCPO,
            updateCategoriaCPO,
            refetch
      } = useCategoriasCPOOperations({
            options: {},
            searchTerm: debouncedSearch,
            orderByEndDate
      });


      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingCategoria(null);
            setIsModalOpen(true);
      };

      const handleEdit = (categoria) => {
            setIsEditMode(true);
            setEditingCategoria(categoria);
            setIsModalOpen(true);
      };

      const handleSave = async (formData) => {
            try {
                  if (isEditMode) {
                        await updateCategoriaCPO(formData);
                  } else {
                        await createCategoriaCPO(formData);
                  }
                  handleCloseModal();
            } catch (error) {
                  console.error('Error al guardar categoría:', error);
            }
      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingCategoria(null);
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
                                                      <h2>Gestión de Categorías Cliente Proveedor u Otro</h2>
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
                                                      <div className="search-input-wrapper">
                                                            <CheckboxInput
                                                                  id="orderByEndDate"
                                                                  name="orderByEndDate"
                                                                  label="Ordenar por vigencia"
                                                                  checked={orderByEndDate}
                                                                  onChange={(e) => {
                                                                        setOrderByEndDate(e.target.checked);
                                                                  }}
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
                                                                  <th>Vigencia</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {categoriasCPO.map(categoria => (
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
                                                {categoriasCPO.map(categoria => (
                                                      <CategoriasCard
                                                            key={categoria.id}
                                                            categoria={categoria}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {categoriasCPO.length === 0 && (
                                                <div className="no-results">
                                                      <MdCategory size={48} color="#ccc" />
                                                      <p>No se encontraron categorías</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Indicadores de estado */}
                                    {isLoading && (
                                          <div className="loading-indicator">
                                                <p>Cargando categorías CPO...</p>
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
                                          editingCategoria={editingCategoria}
                                    />
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default Categorias;
