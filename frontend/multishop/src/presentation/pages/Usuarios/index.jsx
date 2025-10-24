import React, { useState, useEffect } from "react";
import { MdPeople } from "react-icons/md";
import { MdSearch, MdAdd } from "react-icons/md";
import NavbarSidebar from "@components/NavbarSidebar";
import UsuariosModal from "./components/UsuariosModal";
import UsuariosListItem from "./components/UsuariosListItem";
import UsuariosCard from "./components/UsuariosCard";
import "./Usuarios.scss";
import USUARIOS from "@mocks/Usuarios.json";

const Usuarios = () => {
      const [usuarios, setUsuarios] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
            setUsuarios(USUARIOS);
      }, []);

      const handleCreateNew = () => {
            setIsEditMode(false);
            setEditingId(null);
            setIsModalOpen(true);
      };

      const handleEdit = (usuario) => {
            setIsEditMode(true);
            setEditingId(usuario.id);
            setIsModalOpen(true);
      };

      const handleSave = (formData) => {
            if (isEditMode) {
                  setUsuarios(prev => prev.map(usuario =>
                        usuario.id === editingId
                              ? { ...usuario, ...formData }
                              : usuario
                  ));
            } else {
                  const newUsuario = {
                        id: Date.now(),
                        ...formData,
                        createdAt: new Date().toISOString()
                  };
                  setUsuarios(prev => [...prev, newUsuario]);
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
                  const usuario = usuarios.find(u => u.id === editingId);
                  return usuario ? {
                        name: usuario.name,
                        rif: usuario.rif || "",
                        address: usuario.address || "",
                        phone: usuario.phone,
                        email: usuario.email || "",
                        type_seller: usuario.type_seller,
                        commission: usuario.commission || "",
                        credentials: usuario.credentials || ""
                  } : {
                        name: "",
                        rif: "",
                        address: "",
                        phone: "",
                        email: "",
                        type_seller: "U",
                        commission: "",
                        credentials: ""
                  };
            }
            return {
                  name: "",
                  rif: "",
                  address: "",
                  phone: "",
                  email: "",
                  type_seller: "U",
                  commission: "",
                  credentials: ""
            };
      };

      const currentUsuarios = usuarios.slice(0, 10);

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <section className="home_content__indicators">
                              <div className="usuarios-page">
                                    <div className="page-header">
                                          <div className="header-content">
                                                <div className="header-title">
                                                      <MdPeople size={32} color="#36aad4" />
                                                      <h2>Gestión de Usuarios</h2>
                                                </div>
                                                <button className="btn-create" onClick={handleCreateNew}>
                                                      <MdAdd size={20} />
                                                      Nuevo Usuario
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
                                                                  placeholder="Buscar por nombre, RIF, teléfono o email..."
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  className="search-input"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="table-wrapper">
                                                <table className="usuarios-table">
                                                      <thead>
                                                            <tr>
                                                                  <th>Nombre</th>
                                                                  <th>RIF/Cédula</th>
                                                                  <th>Teléfono</th>
                                                                  <th>Tipo</th>
                                                                  <th>Comisión/Credenciales</th>
                                                                  <th>Acciones</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentUsuarios.map(usuario => (
                                                                  <UsuariosListItem
                                                                        key={usuario.id}
                                                                        usuario={usuario}
                                                                        onEdit={handleEdit}
                                                                  />
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="cards-wrapper">
                                                {currentUsuarios.map(usuario => (
                                                      <UsuariosCard
                                                            key={usuario.id}
                                                            usuario={usuario}
                                                            onEdit={handleEdit}
                                                      />
                                                ))}
                                          </div>

                                          {currentUsuarios.length === 0 && (
                                                <div className="no-results">
                                                      <MdPeople size={48} color="#ccc" />
                                                      <p>No se encontraron usuarios</p>
                                                </div>
                                          )}
                                    </div>

                                    {/* Modal para crear/editar */}
                                    <UsuariosModal
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

export default Usuarios;
