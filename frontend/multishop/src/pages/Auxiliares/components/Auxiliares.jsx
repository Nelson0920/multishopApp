import React from "react";
import { useNavigate } from "react-router-dom";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import '../Auxiliares.scss';

const Auxiliares = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/auxiliares");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card auxiliares-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <PiPersonSimpleCircleFill size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Auxiliares Contables</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Auxiliares;
