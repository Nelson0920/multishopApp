import React from "react";
import { MdEdit, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const UsuariosCard = ({ usuario, onEdit }) => {
      const getTypeLabel = (type) => {
            return type === "U" ? "Cliente" : "Proveedor";
      };

      const getTypeColor = (type) => {
            return type === "U" ? "#28a745" : "#ffc107";
      };

      return (
            <div className="usuario-card">
                  <div className="card-header">
                        <div className="usuario-name">{usuario.name}</div>
                        <div className="card-actions">
                              <span
                                    className="type-badge"
                                    style={{ backgroundColor: getTypeColor(usuario.type_seller) }}
                              >
                                    {getTypeLabel(usuario.type_seller)}
                              </span>
                              <button
                                    className="btn-edit"
                                    onClick={() => onEdit(usuario)}
                                    title="Editar usuario"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </div>
                  <div className="card-content">
                        <div className="card-row">
                              <span className="label">RIF/Cédula:</span>
                              <span className="value">{usuario.rif || 'N/A'}</span>
                        </div>
                        <div className="card-row">
                              <span className="label">
                                    <MdPhone size={14} />
                                    Teléfono:
                              </span>
                              <span className="value">{usuario.phone}</span>
                        </div>
                        {usuario.email && (
                              <div className="card-row">
                                    <span className="label">
                                          <MdEmail size={14} />
                                          Email:
                                    </span>
                                    <span className="value">{usuario.email}</span>
                              </div>
                        )}
                        {usuario.address && (
                              <div className="card-row">
                                    <span className="label">
                                          <MdLocationOn size={14} />
                                          Dirección:
                                    </span>
                                    <span className="value">{usuario.address}</span>
                              </div>
                        )}
                        <div className="card-row">
                              <span className="label">
                                    {usuario.type_seller === "P" ? "Comisión:" : "Credenciales:"}
                              </span>
                              <span className="value">
                                    {usuario.type_seller === "P"
                                          ? `${usuario.commission}%`
                                          : usuario.credentials || 'N/A'
                                    }
                              </span>
                        </div>
                  </div>
            </div>
      );
};

export default UsuariosCard;
