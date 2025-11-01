import React, { useState } from "react";
import { MdAssignment } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import AsignacionISRLModal from "./components/AsignacionISRLModal";
import AsignacionISRLListItem from "./components/AsignacionISRLListItem";
import AsignacionISRLCard from "./components/AsignacionISRLCard";
import { useAsignacionISRLOperations } from "@hooks/AsignacionISRL/useAsignacionISRL";
import "./AsignacionISRL.scss";
import { useDebounce } from "@shared/hooks/useDebounce";

const AsignacionISRL = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingConcept, setEditingConcept] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");
      const { debouncedValue: debouncedSearch } = useDebounce(searchTerm, 1000);

      const {
            asignacionISRL,
            isLoading,
            isError,
            error,
            createAsignacionISRL,
            updateAsignacionISRL,
            refetch
      } = useAsignacionISRLOperations({
            options: {},
            searchTerm: debouncedSearch,
      });

      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingConcept(null);
            setIsModalOpen(true);
      };

      const handleEdit = (concept) => {
            setIsEditMode(true);
            setEditingConcept(concept);
            setIsModalOpen(true);
      };

      const handleSave = async (formData) => {
            try {
                  if (isEditMode) {
                        await updateAsignacionISRL(formData);
                  } else {
                        await createAsignacionISRL(formData);
                  }
                  handleCloseModal();
            } catch (error) {
                  console.error('Error al guardar:', error);
            }
      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingConcept(null);
      };

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="asignaciones-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdAssignment size={32} color="#36aad4" />
                                                      <h2>Gestión de Conceptos de Retención ISRL</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nuevo Concepto
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
                                                                  placeholder="Buscar por código, concepto o porcentaje..."
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="asignaciones-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Código</th>
                                                                  <th>Concepto</th>
                                                                  <th>% PN</th>
                                                                  <th>% PJ</th>
                                                                  <th>Sustraendo PN</th>
                                                                  <th>Sustraendo PJ</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {asignacionISRL.map(concept => (
                                                                  <AsignacionISRLListItem
                                                                        key={concept.id}
                                                                        asignacion={concept}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {asignacionISRL.map(concept => (
                                                      <AsignacionISRLCard
                                                            key={concept.id}
                                                            asignacion={concept}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {asignacionISRL.length === 0 && (
                                                <div className="no-results">
                                                      <MdAssignment size={48} color="#ccc" />
                                                      <p>No se encontraron conceptos de retención ISRL</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Indicadores de estado */}
                                    {isLoading && (
                                          <div className="loading-indicator">
                                                <p>Cargando conceptos de retención ISRL...</p>
                                          </div>
                                    )}

                                    {isError && (
                                          <div className="error-indicator">
                                                <p>Error: {error?.message}</p>
                                                <button onClick={() => refetch()}>Reintentar</button>
                                          </div>
                                    )}

                                    {/* Modal para crear/editar */}
                                    <AsignacionISRLModal
                                          isOpen={isModalOpen}
                                          onClose={handleCloseModal}
                                          onSave={handleSave}
                                          isEditMode={isEditMode}
                                          initialData={editingConcept || {
                                                code: "",
                                                name: "",
                                                percentage_pn: "",
                                                percentage_pj: "",
                                                subtrahend_amount_pn: "",
                                                subtrahend_amount_pj: ""
                                          }}
                                    />
                              </div>
                        </section>
                  </div>
            </NavbarSidebar>
      );
};

export default AsignacionISRL;
