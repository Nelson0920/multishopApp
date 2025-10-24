import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPeople } from "react-icons/md";
import '../Usuarios.scss';

const Usuarios = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/usuarios");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card usuarios-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdPeople size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Usuarios</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Usuarios;
