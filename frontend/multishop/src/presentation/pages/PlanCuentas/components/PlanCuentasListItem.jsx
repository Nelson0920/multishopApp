import React from "react";
import { MdEdit } from "react-icons/md";

const PlanCuentasListItem = ({ cuenta, onEdit }) => {
      return (
            <tr>
                  <td>{cuenta.codigo}</td>
                  <td>{cuenta.nombre}</td>
                  <td>{cuenta.auxiliar1 || '-'}</td>
                  <td>{cuenta.auxiliar2 || '-'}</td>
                  <td className="actions">
                        <div className="action-buttons">
                              <button
                                    className="btn btn-edit"
                                    onClick={() => onEdit(cuenta)}
                                    title="Editar cuenta"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default PlanCuentasListItem;