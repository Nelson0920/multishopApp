import React, { useState, useEffect } from "react";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import AuxiliaresModal from "./components/AuxiliaresModal";
import AuxiliaresListItem from "./components/AuxiliaresListItem";
import AuxiliaresCard from "./components/AuxiliaresCard";
import "./Auxiliares.scss";
import AUXILIARES from "@mocks/Auxiliares.json";

const Auxiliares = () => {
      const [auxiliares, setAuxiliares] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
            const auxiliaresWithIds = AUXILIARES.map((auxiliar, index) => ({
                  ...auxiliar,
                  id: index + 1
            }));
            setAuxiliares(auxiliaresWithIds);
      }, []);


      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (auxiliar) => {
            setIsEditMode(true);
            setEditingId(auxiliar.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setAuxiliares(prev => prev.map(auxiliar =>
                        auxiliar.id === editingId
                              ? { ...auxiliar, ...formData }
                              : auxiliar
                  ));
            } else {
                  const newAuxiliar = {
                        id: Date.now(),
                        ...formData
                  };
                  setAuxiliares(prev => [...prev, newAuxiliar]);
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
                  const auxiliar = auxiliares.find(a => a.id === editingId);
                  return auxiliar ? {
                        auxiliar: auxiliar.auxiliar,
                        nombre: auxiliar.nombre
                  } : {
                        auxiliar: "",
                        nombre: ""
                  };
            }
            return {
                  auxiliar: "",
                  nombre: ""
            };
      };

      const currentAuxiliares = auxiliares.slice(0, 10);

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
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
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
                                                            {currentAuxiliares.map(auxiliar => (
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
                                                {currentAuxiliares.map(auxiliar => (
                                                      <AuxiliaresCard
                                                            key={auxiliar.id}
                                                            auxiliar={auxiliar}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {currentAuxiliares.length === 0 && (
                                                <div className="no-results">
                                                      <PiPersonSimpleCircleFill size={48} color="#ccc" />
                                                      <p>No se encontraron auxiliares contables</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <AuxiliaresModal
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

export default Auxiliares;
