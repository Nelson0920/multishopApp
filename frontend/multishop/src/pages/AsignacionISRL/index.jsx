import React, { useState, useEffect } from "react";
import { MdAssignment } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import AsignacionISRLModal from "./components/AsignacionISRLModal";
import AsignacionISRLListItem from "./components/AsignacionISRLListItem";
import AsignacionISRLCard from "./components/AsignacionISRLCard";
import "./AsignacionISRL.scss";
import ASIGNACIONES_ISRL from "@mocks/AsignacionISRL.json";

const AsignacionISRL = () => {
      const [asignaciones, setAsignaciones] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
            setAsignaciones(ASIGNACIONES_ISRL);
      }, []);

      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (asignacion) => {
            setIsEditMode(true);
            setEditingId(asignacion.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setAsignaciones(prev => prev.map(asignacion =>
                        asignacion.id === editingId
                              ? { ...asignacion, ...formData }
                              : asignacion
                  ));
            } else {
                  const newAsignacion = {
                        id: Date.now(),
                        ...formData,
                        createdAt: new Date().toISOString()
                  };
                  setAsignaciones(prev => [...prev, newAsignacion]);
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
                  const asignacion = asignaciones.find(a => a.id === editingId);
                  return asignacion ? {
                        code: asignacion.code,
                        name: asignacion.name,
                        percentage_pn: asignacion.percentage_pn,
                        percentage_pj: asignacion.percentage_pj,
                        subtrahend_amount_pn: asignacion.subtrahend_amount_pn,
                        subtrahend_amount_pj: asignacion.subtrahend_amount_pj || ""
                  } : {
                        code: "",
                        name: "",
                        percentage_pn: "",
                        percentage_pj: "",
                        subtrahend_amount_pn: "",
                        subtrahend_amount_pj: ""
                  };
            }
            return {
                  code: "",
                  name: "",
                  percentage_pn: "",
                  percentage_pj: "",
                  subtrahend_amount_pn: "",
                  subtrahend_amount_pj: ""
            };
      };

      const currentAsignaciones = asignaciones.slice(0, 10);

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
                                                            {currentAsignaciones.map(asignacion => (
                                                                  <AsignacionISRLListItem
                                                                        key={asignacion.id}
                                                                        asignacion={asignacion}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {currentAsignaciones.map(asignacion => (
                                                      <AsignacionISRLCard
                                                            key={asignacion.id}
                                                            asignacion={asignacion}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {currentAsignaciones.length === 0 && (
                                                <div className="no-results">
                                                      <MdAssignment size={48} color="#ccc" />
                                                      <p>No se encontraron conceptos de retención ISRL</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <AsignacionISRLModal
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

export default AsignacionISRL;
