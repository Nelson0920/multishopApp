import React from "react";
import { useNavigate } from "react-router-dom";
import { MdBusiness } from "react-icons/md";
import '../CPO.scss';

const CPO = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/cpo");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card cpo-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdBusiness size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Cliente Proveedor u Otro</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CPO;
