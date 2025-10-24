import React, { useState, useEffect } from "react";
import { MdAdd, MdSearch, MdBusiness } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import CPOModal from "./components/CPOModal";
import CPOListItem from "./components/CPOListItem";
import CPOCard from "./components/CPOCard";
import "./CPO.scss";
import CPO_DATA from "@mocks/CPO.json";
import PLAN_CUENTAS from "@mocks/PlanCuentas.json";
import AUXILIARES from "@mocks/Auxiliares.json";
import CATEGORIAS_CPO from "@mocks/CategoriasCPO.json";
import CONDICIONES_PAGO from "@mocks/CondicionesPago.json";
import ASIGNACIONES_ISRL from "@mocks/AsignacionISRL.json";
import USUARIOS from "@mocks/Usuarios.json";

const CPOPage = () => {
      const [cpos, setCpos] = useState([]);
      const [filteredCpos, setFilteredCpos] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingCpo, setEditingCpo] = useState(null);
      const [isEditMode, setIsEditMode] = useState(false);

      useEffect(() => {
            setCpos(CPO_DATA);
            setFilteredCpos(CPO_DATA);
      }, []);

      useEffect(() => {
            if (!searchTerm.trim()) {
                  setFilteredCpos(cpos);
            } else {
                  const filtered = cpos.filter(cpo =>
                        cpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cpo.rif.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cpo.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cpo.phone?.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setFilteredCpos(filtered);
            }
      }, [searchTerm, cpos]);

      const handleCreate = () => {
            setEditingCpo(null);
            setIsEditMode(false);
            setIsModalOpen(true);
      };

      const handleEdit = (cpo) => {
            setEditingCpo(cpo);
            setIsEditMode(true);
            setIsModalOpen(true);
      };

      const handleDelete = (id) => {
            if (window.confirm("¿Estás seguro de que deseas eliminar este CPO?")) {
                  setCpos(prev => prev.filter(cpo => cpo.id !== id));
            }
      };

      const handleSave = (cpoData) => {
            if (isEditMode && editingCpo) {
                  setCpos(prev => prev.map(cpo =>
                        cpo.id === editingCpo.id
                              ? { ...cpoData, id: editingCpo.id, createdAt: editingCpo.createdAt }
                              : cpo
                  ));
            } else {
                  const newCpo = {
                        ...cpoData,
                        id: Math.max(...cpos.map(c => c.id), 0) + 1,
                        createdAt: new Date().toISOString(),
                        deleteAt: null,
                        last_visit: cpoData.type === "cliente" ? new Date().toISOString() : null
                  };
                  setCpos(prev => [...prev, newCpo]);
            }
            setIsModalOpen(false);
            setEditingCpo(null);
            setIsEditMode(false);
      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            setEditingCpo(null);
            setIsEditMode(false);
      };

      const getInitialData = () => {
            if (editingCpo) {
                  return editingCpo;
            }
            return {
                  type: "cliente",
                  rif: "",
                  name: "",
                  gender: "",
                  birthdate: "",
                  name_commercial: "",
                  address: "",
                  address_fiscal: "",
                  phone: "",
                  email: "",
                  observations: "",
                  id_categories_clients: 99,
                  id_categoria_default_c: "",
                  id_categoria_default_p: "",
                  id_sellers: "",
                  credentials: "",
                  marketing_environment: "nacional",
                  id_accounting_accounts: "",
                  auxiliary1: "",
                  auxiliary2: "",
                  bank_accounts: "",
                  id_PaymentConditions: "",
                  type_taxpayer: "contribuyente ordinario",
                  retention_percentage_iva: 75,
                  id_RetentionISLRConcepts: "",
                  automatic_islr: false,
                  blockade: false,
                  observations_blockade: ""
            };
      };

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="cpo-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdBusiness size={32} color="#36aad4" />
                                                      <h2>Gestión de Clientes, Proveedores u Otros</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreate}>
                                                      <MdAdd size={20} />
                                                      Nuevo
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
                                                                  placeholder="Buscar por nombre, RIF, email o teléfono..."
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="cpo-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Tipo</th>
                                                                  <th>RIF/Cédula</th>
                                                                  <th>Nombre</th>
                                                                  <th>Teléfono</th>
                                                                  <th>Categoría</th>
                                                                  <th>Vendedor</th>
                                                                  <th>Estado</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {filteredCpos.map(cpo => (
                                                                  <CPOListItem
                                                                        key={cpo.id}
                                                                        cpo={cpo}
                                                                        onEdit={handleEdit}
                                                                        onDelete={handleDelete}
                                                                        categoriasCPO={CATEGORIAS_CPO}
                                                                        usuarios={USUARIOS}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {filteredCpos.map(cpo => (
                                                      <CPOCard
                                                            key={cpo.id}
                                                            cpo={cpo}
                                                            onEdit={handleEdit}
                                                            onDelete={handleDelete}
                                                            planCuentas={PLAN_CUENTAS}
                                                            auxiliares={AUXILIARES}
                                                            categoriasCPO={CATEGORIAS_CPO}
                                                            condicionesPago={CONDICIONES_PAGO}
                                                            asignacionesISRL={ASIGNACIONES_ISRL}
                                                            usuarios={USUARIOS}
                                                      />
                                                ))}
                                          </div>

                                          {filteredCpos.length === 0 && (
                                                <div className="no-results">
                                                      <MdBusiness size={48} color="#ccc" />
                                                      <p>No se encontraron CPOs</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <CPOModal
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

export default CPOPage;
