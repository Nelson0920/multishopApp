import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasListItem = ({ categoria, onEdit }) => {
      return (
            <tr>
                  <td>{categoria.name}</td>
                  <td>{categoria.credit_limit}</td>
                  <td>{categoria.credit_terms}</td>
                  <td>{categoria.discount_percentage}</td>
                  <td>{categoria.deadline_day}</td>
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
