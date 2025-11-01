import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasListItem = ({ categoria, onEdit }) => {
      return (
            <tr>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descuento}</td>
                  <td>{categoria.ganancia}</td>
                  <td>{categoria.gestionBanda ? "Si" : "No"}</td>
                  <td className="actions">
                        <div className="action-buttons">
                              <button
                                    className="btn btn-edit"
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
