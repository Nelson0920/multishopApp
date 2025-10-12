import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../CPO.scss";

const CPOListItem = ({
      cpo,
      onEdit,
      onDelete,
      categoriasCPO,
      usuarios
}) => {
      const getCategoria = (id) => {
            const categoria = categoriasCPO.find(c => c.id === id);
            return categoria ? categoria.name : "N/A";
      };

      const getVendedor = (id) => {
            const vendedor = usuarios.find(u => u.id === id);
            return vendedor ? vendedor.name : "N/A";
      };

      const getTipoTexto = (tipo) => {
            switch (tipo) {
                  case "cliente": return "Cliente";
                  case "proveedor": return "Proveedor";
                  case "otros": return "Otros";
                  default: return tipo;
            }
      };
      return (
            <tr className="cpo-list-item">
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-type">{getTipoTexto(cpo.type)}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-rif">{cpo.rif}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-name">{cpo.name}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-phone">{cpo.phone || "N/A"}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-categoria">{getCategoria(cpo.id_categories_clients)}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className="cpo-vendedor">{getVendedor(cpo.id_sellers)}</span>
                        </div>
                  </td>
                  <td className="cpo-cell">
                        <div className="cpo-cell-content">
                              <span className={`cpo-blockade ${cpo.blockade ? 'blocked' : 'active'}`}>
                                    {cpo.blockade ? "Bloqueado" : "Activo"}
                              </span>
                        </div>
                  </td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(cpo)}
                                    title="Editar CPO"
                              >
                                    <MdEdit size={16} />
                              </button>
                              <button
                                    className="btn-action btn-delete"
                                    onClick={() => onDelete(cpo.id)}
                                    title="Eliminar CPO"
                              >
                                    <MdDelete size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default CPOListItem;
