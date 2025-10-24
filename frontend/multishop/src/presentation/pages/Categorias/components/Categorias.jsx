import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";

const Categorias = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/categorias");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card categorias-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdCategory size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Categorías</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Categorias;