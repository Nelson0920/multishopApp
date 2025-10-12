import React from "react";
import { MdEdit } from "react-icons/md";

const UsuariosListItem = ({ usuario, onEdit }) => {
      const getTypeLabel = (type) => {
            return type === "U" ? "Cliente" : "Proveedor";
      };

      const getTypeColor = (type) => {
            return type === "U" ? "#28a745" : "#ffc107";
      };

      return (
            <tr>
                  <td>{usuario.name}</td>
                  <td>{usuario.rif || 'N/A'}</td>
                  <td>{usuario.phone}</td>
                  <td>
                        <span
                              className="type-badge"
                              style={{ backgroundColor: getTypeColor(usuario.type_seller) }}
                        >
                              {getTypeLabel(usuario.type_seller)}
                        </span>
                  </td>
                  <td>
                        {usuario.type_seller === "P"
                              ? `${usuario.commission}%`
                              : usuario.credentials || 'N/A'
                        }
                  </td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(usuario)}
                                    title="Editar usuario"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default UsuariosListItem;
