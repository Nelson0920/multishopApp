import React, { useState, useEffect } from "react";
import { MdArrowBack, MdBusiness, MdPayment, MdPerson, MdAdd, MdEdit } from "react-icons/md";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import NavbarSidebar from "@components/NavbarSidebar";
import CondicionesPagoModal from "../CondicionesPago/components/CondicionesPagoModal";
import UsuariosModal from "../Usuarios/components/UsuariosModal";
import CPOModal from "./components/CPOModal";
import { useCondicionesPagoOperations } from "@hooks/CondicionesPago/useCondicionesPago";
import "./CPODetails.scss";
import CPO_DATA from "@mocks/CPO.json";
import USUARIOS from "@mocks/Usuarios.json";

const CPODetails = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      const [cpo, setCpo] = useState(null);
      const [usuarios, setUsuarios] = useState([]);
      const [activeTab, setActiveTab] = useState('condiciones');
      const [isLoading, setIsLoading] = useState(true);

      const {
            condicionesPago,
            isLoading: isLoadingCondiciones,
            isError: isErrorCondiciones,
            error: errorCondiciones,
            createCondicionPago,
            updateCondicionPago,
            refetch: refetchCondiciones
      } = useCondicionesPagoOperations({
            options: {},
            searchTerm: ''
      });

      const [isCondicionModalOpen, setIsCondicionModalOpen] = useState(false);
      const [isUsuarioModalOpen, setIsUsuarioModalOpen] = useState(false);
      const [isCPOModalOpen, setIsCPOModalOpen] = useState(false);
      const [editingCondicion, setEditingCondicion] = useState(null);
      const [editingUsuario, setEditingUsuario] = useState(null);

      useEffect(() => {
            const tabParam = searchParams.get('tab');
            if (tabParam === 'usuarios' || tabParam === 'condiciones') {
                  setActiveTab(tabParam);
            }
      }, [searchParams]);

      useEffect(() => {
            const loadCPOData = async () => {
                  setIsLoading(true);

                  const foundCpo = CPO_DATA.find(c => c.id === parseInt(id));
                  if (foundCpo) {
                        setCpo(foundCpo);

                        const usuariosRelacionados = USUARIOS.filter(u =>
                              u.cpo_id === foundCpo.id || u.cpo_name === foundCpo.name
                        );
                        setUsuarios(usuariosRelacionados);
                  }

                  setIsLoading(false);
            };

            loadCPOData();
      }, [id]);

      const handleBack = () => {
            navigate('/cpo');
      };

      const handleEditCPO = () => {
            setIsCPOModalOpen(true);
      };

      const handleAddCondicionPago = () => {
            setEditingCondicion(null);
            setIsCondicionModalOpen(true);
      };

      const handleAddUsuario = () => {
            setEditingUsuario(null);
            setIsUsuarioModalOpen(true);
      };

      const handleEditCondicionPago = (condicion) => {
            setEditingCondicion(condicion);
            setIsCondicionModalOpen(true);
      };

      const handleEditUsuario = (usuario) => {
            setEditingUsuario(usuario);
            setIsUsuarioModalOpen(true);
      };

      const handleSaveCondicionPago = async (formData) => {
            try {
                  if (editingCondicion) {
                        await updateCondicionPago({ ...formData, id: editingCondicion.id });
                  } else {
                        await createCondicionPago(formData);
                  }
                  setIsCondicionModalOpen(false);
                  setEditingCondicion(null);
            } catch (error) {
                  console.error('Error al guardar condición de pago:', error);
            }
      };

      const handleSaveUsuario = (formData) => {
            const newUsuario = {
                  id: editingUsuario ? editingUsuario.id : Date.now(),
                  name: formData.name,
                  rif: formData.rif,
                  address: formData.address,
                  phone: formData.phone,
                  email: formData.email,
                  role: formData.type_seller === "P" ? "Proveedor" : "Cliente",
                  commission: formData.commission || null,
                  credentials: formData.credentials || null,
                  status: true,
                  cpo_id: cpo.id,
                  cpo_name: cpo.name
            };

            if (editingUsuario) {
                  // Editar usuario existente
                  setUsuarios(prev =>
                        prev.map(u => u.id === editingUsuario.id ? newUsuario : u)
                  );
            } else {
                  setUsuarios(prev => [...prev, newUsuario]);
            }

            setIsUsuarioModalOpen(false);
            setEditingUsuario(null);
      };

      const handleCloseCondicionModal = () => {
            setIsCondicionModalOpen(false);
            setEditingCondicion(null);
      };

      const handleCloseUsuarioModal = () => {
            setIsUsuarioModalOpen(false);
            setEditingUsuario(null);
      };

      const handleDeleteUsuario = (usuarioId) => {
            if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                  setUsuarios(prev => prev.filter(u => u.id !== usuarioId));
            }
      };

      const handleSaveCPO = (formData) => {
            const updatedCPO = {
                  ...cpo,
                  ...formData,
                  id: cpo.id // Mantener el ID original
            };

            setCpo(updatedCPO);
            setIsCPOModalOpen(false);
      };

      const handleCloseCPOModal = () => {
            setIsCPOModalOpen(false);
      };

      if (isLoading) {
            return (
                  <NavbarSidebar>
                        <div className="page-container">
                              <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Cargando detalles del CPO...</p>
                              </div>
                        </div>
                  </NavbarSidebar>
            );
      }

      if (!cpo) {
            return (
                  <NavbarSidebar>
                        <div className="page-container">
                              <div className="error-container">
                                    <MdBusiness size={48} color="#ff6b6b" />
                                    <h2>CPO no encontrado</h2>
                                    <p>El CPO que buscas no existe o ha sido eliminado.</p>
                                    <button className="btn-primary" onClick={handleBack}>
                                          Volver a la lista
                                    </button>
                              </div>
                        </div>
                  </NavbarSidebar>
            );
      }

      return (
            <NavbarSidebar>
                  <div className="page-container">
                        <div className="cpo-details-page">
                              {/* Header */}
                              <div className="details-header">
                                    <div className="header-actions">
                                          <button className="btn-back" onClick={handleBack}>
                                                <MdArrowBack size={20} />
                                                Volver
                                          </button>
                                          <button className="btn-edit" onClick={handleEditCPO}>
                                                <MdEdit size={20} />
                                                Editar CPO
                                          </button>
                                    </div>

                                    <div className="cpo-info">
                                          <div className="cpo-icon">
                                                <MdBusiness size={48} color="#36aad4" />
                                          </div>
                                          <div className="cpo-details">
                                                <h1>{cpo.name}</h1>
                                                <div className="cpo-meta">
                                                      <span className="rif">RIF: {cpo.rif}</span>
                                                      <span className="email">Email: {cpo.email || 'No especificado'}</span>
                                                      <span className="phone">Teléfono: {cpo.phone || 'No especificado'}</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* Tabs */}
                              <div className="tabs-container">
                                    <div className="tabs">
                                          <button
                                                className={`tab ${activeTab === 'condiciones' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('condiciones')}
                                          >
                                                <MdPayment size={20} />
                                                Condiciones de Pago ({condicionesPago.length})
                                          </button>
                                          <button
                                                className={`tab ${activeTab === 'usuarios' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('usuarios')}
                                          >
                                                <MdPerson size={20} />
                                                Usuarios ({usuarios.length})
                                          </button>
                                    </div>
                              </div>

                              {/* Content */}
                              <div className="tab-content">
                                    {activeTab === 'condiciones' && (
                                          <div className="condiciones-pago-section">
                                                {searchParams.get('tab') === 'condiciones' && (
                                                      <div className="info-banner">
                                                            <MdPayment size={20} />
                                                            <span>Accediste desde el botón de condiciones de pago. Aquí puedes gestionar todas las condiciones de este CPO.</span>
                                                      </div>
                                                )}
                                                <div className="section-header">
                                                      <h2>Condiciones de Pago</h2>
                                                      <button className="btn-add" onClick={handleAddCondicionPago}>
                                                            <MdAdd size={20} />
                                                            Agregar Condición
                                                      </button>
                                                </div>

                                                {isLoadingCondiciones ? (
                                                      <div className="loading-state">
                                                            <div className="loading-spinner"></div>
                                                            <p>Cargando condiciones de pago...</p>
                                                      </div>
                                                ) : isErrorCondiciones ? (
                                                      <div className="error-state">
                                                            <MdPayment size={48} color="#ff6b6b" />
                                                            <h3>Error al cargar condiciones</h3>
                                                            <p>Error: {errorCondiciones?.message}</p>
                                                            <button className="btn-primary" onClick={() => refetchCondiciones()}>
                                                                  Reintentar
                                                            </button>
                                                      </div>
                                                ) : condicionesPago.length === 0 ? (
                                                      <div className="empty-state">
                                                            <MdPayment size={48} color="#ccc" />
                                                            <h3>No hay condiciones de pago</h3>
                                                            <p>Este CPO no tiene condiciones de pago configuradas.</p>
                                                            <button className="btn-primary" onClick={handleAddCondicionPago}>
                                                                  Agregar primera condición
                                                            </button>
                                                      </div>
                                                ) : (
                                                      <div className="condiciones-list">
                                                            {condicionesPago.map(condicion => (
                                                                  <div key={condicion.id} className="condicion-card">
                                                                        <div className="condicion-header">
                                                                              <h3>Condición {condicion.days} días</h3>
                                                                              <div className="condicion-actions">
                                                                                    <button
                                                                                          className="btn-edit-small"
                                                                                          onClick={() => handleEditCondicionPago(condicion)}
                                                                                          title="Editar condición de pago"
                                                                                    >
                                                                                          <MdEdit size={16} />
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                        <div className="condicion-details">
                                                                              <div className="detail-item">
                                                                                    <span className="label">Días:</span>
                                                                                    <span className="value">{condicion.days} días</span>
                                                                              </div>
                                                                              <div className="detail-item">
                                                                                    <span className="label">Descuento:</span>
                                                                                    <span className="value">{condicion.discount_percentage}%</span>
                                                                              </div>
                                                                              <div className="detail-item">
                                                                                    <span className="label">Creado:</span>
                                                                                    <span className="value">
                                                                                          {condicion.createdAt ? new Date(condicion.createdAt).toLocaleDateString() : 'N/A'}
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                )}
                                          </div>
                                    )}

                                    {activeTab === 'usuarios' && (
                                          <div className="usuarios-section">
                                                {searchParams.get('tab') === 'usuarios' && (
                                                      <div className="info-banner">
                                                            <MdPerson size={20} />
                                                            <span>Accediste desde el botón de usuarios. Aquí puedes gestionar todos los usuarios de este CPO.</span>
                                                      </div>
                                                )}
                                                <div className="section-header">
                                                      <h2>Usuarios del CPO</h2>
                                                      <button className="btn-add" onClick={handleAddUsuario}>
                                                            <MdAdd size={20} />
                                                            Agregar Usuario
                                                      </button>
                                                </div>

                                                {usuarios.length === 0 ? (
                                                      <div className="empty-state">
                                                            <MdPerson size={48} color="#ccc" />
                                                            <h3>No hay usuarios asignados</h3>
                                                            <p>Este CPO no tiene usuarios asignados.</p>
                                                            <button className="btn-primary" onClick={handleAddUsuario}>
                                                                  Asignar primer usuario
                                                            </button>
                                                      </div>
                                                ) : (
                                                      <div className="usuarios-list">
                                                            {usuarios.map(usuario => (
                                                                  <div key={usuario.id} className="usuario-card">
                                                                        <div className="usuario-header">
                                                                              <div className="usuario-info">
                                                                                    <h3>{usuario.name}</h3>
                                                                                    <p className="usuario-email">{usuario.email}</p>
                                                                              </div>
                                                                              <div className="usuario-actions">
                                                                                    <button
                                                                                          className="btn-edit-small"
                                                                                          onClick={() => handleEditUsuario(usuario)}
                                                                                          title="Editar usuario"
                                                                                    >
                                                                                          <MdEdit size={16} />
                                                                                    </button>
                                                                                    <button
                                                                                          className="btn-delete-small"
                                                                                          onClick={() => handleDeleteUsuario(usuario.id)}
                                                                                          title="Eliminar usuario"
                                                                                    >
                                                                                          <MdDelete size={16} />
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                        <div className="usuario-details">
                                                                              <div className="detail-item">
                                                                                    <span className="label">Rol:</span>
                                                                                    <span className="value">{usuario.role || 'Usuario'}</span>
                                                                              </div>
                                                                              <div className="detail-item">
                                                                                    <span className="label">Teléfono:</span>
                                                                                    <span className="value">{usuario.phone || 'No especificado'}</span>
                                                                              </div>
                                                                              <div className="detail-item">
                                                                                    <span className="label">Estado:</span>
                                                                                    <span className={`status ${usuario.active ? 'active' : 'inactive'}`}>
                                                                                          {usuario.active ? 'Activo' : 'Inactivo'}
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                )}
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>

                  {/* Modales */}
                  <CPOModal
                        isOpen={isCPOModalOpen}
                        onClose={handleCloseCPOModal}
                        onSave={handleSaveCPO}
                        isEditMode={true}
                        initialData={cpo ? {
                              type: cpo.type || "cliente",
                              rif: cpo.rif || "",
                              name: cpo.name || "",
                              gender: cpo.gender || "",
                              birthdate: cpo.birthdate || "",
                              name_commercial: cpo.name_commercial || "",
                              address: cpo.address || "",
                              address_fiscal: cpo.address_fiscal || "",
                              phone: cpo.phone || "",
                              email: cpo.email || "",
                              observations: cpo.observations || "",
                              id_categories_clients: cpo.id_categories_clients || 99,
                              id_categoria_default_c: cpo.id_categoria_default_c || "",
                              id_categoria_default_p: cpo.id_categoria_default_p || "",
                              id_sellers: cpo.id_sellers || "",
                              credentials: cpo.credentials || "",
                              marketing_environment: cpo.marketing_environment || "nacional",
                              id_accounting_accounts: cpo.id_accounting_accounts || "",
                              auxiliary1: cpo.auxiliary1 || "",
                              auxiliary2: cpo.auxiliary2 || "",
                              bank_accounts: cpo.bank_accounts || "",
                              id_PaymentConditions: cpo.id_PaymentConditions || "",
                              type_taxpayer: cpo.type_taxpayer || "contribuyente ordinario",
                              retention_percentage_iva: cpo.retention_percentage_iva || 75,
                              id_RetentionISLRConcepts: cpo.id_RetentionISLRConcepts || "",
                              automatic_islr: cpo.automatic_islr || false,
                              blockade: cpo.blockade || false,
                              observations_blockade: cpo.observations_blockade || ""
                        } : {}}
                  />

                  <CondicionesPagoModal
                        isOpen={isCondicionModalOpen}
                        onClose={handleCloseCondicionModal}
                        onSave={handleSaveCondicionPago}
                        isEditMode={!!editingCondicion}
                        initialData={editingCondicion ? {
                              days: editingCondicion.days?.toString() || "",
                              discount_percentage: editingCondicion.discount_percentage?.toString() || ""
                        } : {
                              days: "",
                              discount_percentage: ""
                        }}
                  />

                  <UsuariosModal
                        isOpen={isUsuarioModalOpen}
                        onClose={handleCloseUsuarioModal}
                        onSave={handleSaveUsuario}
                        isEditMode={!!editingUsuario}
                        initialData={editingUsuario ? {
                              name: editingUsuario.name || "",
                              rif: editingUsuario.rif || "",
                              address: editingUsuario.address || "",
                              phone: editingUsuario.phone || "",
                              email: editingUsuario.email || "",
                              type_seller: editingUsuario.role === "Proveedor" ? "P" : "U",
                              commission: editingUsuario.commission?.toString() || "",
                              credentials: editingUsuario.credentials || ""
                        } : {
                              name: "",
                              rif: "",
                              address: "",
                              phone: "",
                              email: "",
                              type_seller: "U",
                              commission: "",
                              credentials: ""
                        }}
                  />
            </NavbarSidebar>
      );
};

export default CPODetails;
