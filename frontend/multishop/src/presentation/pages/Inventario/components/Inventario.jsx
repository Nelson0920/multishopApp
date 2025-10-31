import React from "react";
import { useNavigate } from "react-router-dom";
import { MdInventory } from "react-icons/md";
import '@presentation-styles/components/FeatureCards.scss';

const Inventario = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/inventario");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card inventario-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdInventory size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Inventario</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Inventario;
