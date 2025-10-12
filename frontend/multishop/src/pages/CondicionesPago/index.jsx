import React, { useState, useEffect } from "react";
import { MdPayment } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import CondicionesPagoModal from "./components/CondicionesPagoModal";
import CondicionesPagoListItem from "./components/CondicionesPagoListItem";
import CondicionesPagoCard from "./components/CondicionesPagoCard";
import "./CondicionesPago.scss";
import CONDICIONES_PAGO from "@mocks/CondicionesPago.json";

const CondicionesPago = () => {
      const [condiciones, setCondiciones] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
            setCondiciones(CONDICIONES_PAGO);
      }, []);

      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (condicion) => {
            setIsEditMode(true);
            setEditingId(condicion.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setCondiciones(prev => prev.map(condicion =>
                        condicion.id === editingId
                              ? { ...condicion, ...formData }
                              : condicion
                  ));
            } else {
                  const newCondicion = {
                        id: Date.now(),
                        ...formData,
                        createdAt: new Date().toISOString()
                  };
                  setCondiciones(prev => [...prev, newCondicion]);
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
                  const condicion = condiciones.find(c => c.id === editingId);
                  return condicion ? {
                        days: condicion.days,
                        discount_percentage: condicion.discount_percentage
                  } : {
                        days: "",
                        discount_percentage: ""
                  };
            }
            return {
                  days: "",
                  discount_percentage: ""
            };
      };

      const currentCondiciones = condiciones.slice(0, 10);

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="condiciones-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdPayment size={32} color="#36aad4" />
                                                      <h2>Gestión de Condiciones de Pago</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nueva Condición
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
                                                                  placeholder="Buscar por días o descuento..."
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="condiciones-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Días</th>
                                                                  <th>Descuento</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentCondiciones.map(condicion => (
                                                                  <CondicionesPagoListItem
                                                                        key={condicion.id}
                                                                        condicion={condicion}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {currentCondiciones.map(condicion => (
                                                      <CondicionesPagoCard
                                                            key={condicion.id}
                                                            condicion={condicion}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {currentCondiciones.length === 0 && (
                                                <div className="no-results">
                                                      <MdPayment size={48} color="#ccc" />
                                                      <p>No se encontraron condiciones de pago</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <CondicionesPagoModal
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

export default CondicionesPago;
