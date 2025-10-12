import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasListItem = ({ categoria, onEdit }) => {
      return (
            <tr>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.margenGanancia}</td>
                  <td>{categoria.porcentajeComision}</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(categoria)}
                                    title="Editar categoría"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default CategoriasListItem;
