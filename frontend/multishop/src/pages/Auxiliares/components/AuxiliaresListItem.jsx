import React from "react";
import { MdEdit } from "react-icons/md";

const AuxiliaresListItem = ({ auxiliar, onEdit }) => {
      return (
            <tr>
                  <td>{auxiliar.auxiliar}</td>
                  <td>{auxiliar.nombre}</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(auxiliar)}
                                    title="Editar auxiliar"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default AuxiliaresListItem;
