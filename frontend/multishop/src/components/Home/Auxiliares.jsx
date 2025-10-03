import React, { useState } from "react";
import "../../styles/Auxiliares.scss";
import { PiPersonSimpleCircleFill } from "react-icons/pi";

const Auxiliares = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [auxiliar, setAuxiliar] = useState("");
      const [nombre, setNombre] = useState("");

      const handleAceptar = () => {
            setIsModalOpen(false);
            setAuxiliar("");
            setNombre("");
      };

      const handleCancelar = () => {
            setIsModalOpen(false);
            setAuxiliar("");
            setNombre("");
      };

      const handleOpenModal = () => {
            setIsModalOpen(true);
      };

      const handleLetterChange = (e) => {
            const value = e.target.value.toUpperCase();
            const letter = value.replace(/[^A-Z]/g, '').substring(value.length - 1, value.length);
            const numericValue = parseInt(auxiliar.replace(/[^0-9]/g, '')) || 0;
            const formattedNumbers = numericValue.toString().padStart(7, '0');
            setAuxiliar(letter + formattedNumbers);
      };

      const handleNumberChange = (e) => {
            const numbers = e.target.value.replace(/[^0-9]/g, '');
            if (numbers > 9999999) return;
            const numericValue = parseInt(numbers) || 0;
            const letter = auxiliar.replace(/[^A-Z]/g, '').substring(0, 1);
            const formattedNumbers = numericValue.toString().padStart(7, '0');
            setAuxiliar(letter + formattedNumbers);
      };

      const handleNombreChange = (e) => {
            const value = e.target.value.toUpperCase();
            const name = value.replace(/[^A-Z ]/g, '');
            setNombre(name);
      };


      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card auxiliares-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <PiPersonSimpleCircleFill size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Auxiliares</h3>
                              </div>
                        </div>
                  </div>

                  {isModalOpen && (
                        <div className="modal_overlay" onClick={handleCancelar}>
                              <div className="modal_container" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal_header">
                                          <h2 className="modal_title">Crear Auxiliar</h2>
                                          <div className="modal_icon">
                                                <PiPersonSimpleCircleFill size={24} color="#36aad4" />
                                          </div>
                                    </div>

                                    <div className="modal_form">
                                          <div className="input_group">
                                                <label htmlFor="auxiliar" className="input_label">
                                                      Auxiliar
                                                </label>
                                                <div className="auxiliar_inputs_container">
                                                      <input
                                                            type="text"
                                                            id="auxiliar-letter"
                                                            value={auxiliar.replace(/[^A-Z]/g, '')}
                                                            onChange={handleLetterChange}
                                                            className="modal_input auxiliar_letter_input"
                                                            placeholder="A"
                                                      />
                                                      <input
                                                            type="text"
                                                            id="auxiliar-number"
                                                            value={auxiliar.replace(/[^0-9]/g, '')}
                                                            onChange={handleNumberChange}
                                                            className="modal_input auxiliar_number_input"
                                                            placeholder="0000001"
                                                      />
                                                </div>
                                                <div className="auxiliar_preview">
                                                      {auxiliar ? auxiliar : 'Ejemplo: A0000001'}
                                                </div>
                                          </div>

                                          <div className="input_group">
                                                <label htmlFor="nombre" className="input_label">
                                                      Nombre
                                                </label>
                                                <input
                                                      type="text"
                                                      id="nombre"
                                                      value={nombre}
                                                      onChange={handleNombreChange}
                                                      className="modal_input"
                                                      placeholder="Ingrese el nombre del auxiliar"
                                                />
                                          </div>
                                    </div>

                                    <div className="modal_actions">
                                          <button
                                                className="btn_cancel"
                                                onClick={handleCancelar}
                                          >
                                                Cancelar
                                          </button>
                                          <button
                                                className="btn_accept"
                                                onClick={handleAceptar}
                                                disabled={!auxiliar.trim() || !nombre.trim()}
                                          >
                                                Aceptar
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default Auxiliares;
