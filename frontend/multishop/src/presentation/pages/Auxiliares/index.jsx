import React, { useCallback, useState } from "react";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import AuxiliaresModal from "./components/AuxiliaresModal";
import AuxiliaresListItem from "./components/AuxiliaresListItem";
import AuxiliaresCard from "./components/AuxiliaresCard";
import { useAuxiliaresOperations } from "@hooks/Auxiliares/useAuxiliares";
import { useDebounce } from "@shared/hooks/useDebounce";
import "./Auxiliares.scss";

const Auxiliares = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingAuxiliar, setEditingAuxiliar] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const { debouncedValue } = useDebounce(searchTerm, 1000, 5);

      const { createAuxiliar, updateAuxiliar, auxiliares, error, isLoading } = useAuxiliaresOperations({ searchTerm: debouncedValue });

      const handleCreateNew = () => {
            setEditingAuxiliar(null);
            setIsModalOpen(true);
      };

      const handleEdit = (auxiliar) => {
            setEditingAuxiliar(auxiliar);
            setIsModalOpen(true);
      };

      const handleSave = async (formData) => {
            if (editingAuxiliar) {
                  await updateAuxiliar(formData);
            } else {
                  await createAuxiliar(formData);
            }
            handleCloseModal();

      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setEditingAuxiliar(null);
            //clearError();
      };

      const handleSearchChange = useCallback((e) => {
            setSearchTerm(e.target.value);
      }, [setSearchTerm]);


      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="auxiliares-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <PiPersonSimpleCircleFill size={32} color="#36aad4" />
                                                      <h2>Gestión de Auxiliares Contables</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nuevo Auxiliar
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
                                                </div>
                                          </div>
                                          <div className="table-wrapper">
                                                <table className="auxiliares-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Código</th>
                                                                  <th>Nombre</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {auxiliares && auxiliares.length > 0 && auxiliares.map(auxiliar => (
                                                                  <AuxiliaresListItem
                                                                        key={auxiliar.id}
                                                                        auxiliar={auxiliar}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {auxiliares && auxiliares.length > 0 && auxiliares.map(auxiliar => (
                                                      <AuxiliaresCard
                                                            key={auxiliar.id}
                                                            auxiliar={auxiliar}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {auxiliares && auxiliares.length === 0 && (
                                                <div className="no-results">
                                                      <PiPersonSimpleCircleFill size={48} color="#ccc" />
                                                      <p>
                                                            {searchTerm.trim() && searchTerm.length < 3
                                                                  ? `Escribe al menos 3 caracteres para buscar`
                                                                  : searchTerm.trim()
                                                                        ? `No se encontraron auxiliares que coincidan con "${searchTerm}"`
                                                                        : "No se encontraron auxiliares contables"
                                                            }
                                                      </p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Indicadores de estado */}
                                    {isLoading && (
                                          <div className="loading-indicator">
                                                <p>Cargando auxiliares...</p>
                                          </div>
                                    )}

                                    {error && (
                                          <div className="error-indicator">
                                                <p>Error: {error.message}</p>
                                                <button onClick={() => { }}>Cerrar</button>
                                          </div>
                                    )}

                                    {/* Modal para crear/editar */}
                                    <AuxiliaresModal
                                          isOpen={isModalOpen}
                                          editingAuxiliar={editingAuxiliar}
                                          onClose={handleCloseModal}
                                          onSave={handleSave}
                                    />
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default Auxiliares;
