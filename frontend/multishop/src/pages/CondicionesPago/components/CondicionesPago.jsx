import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import '../CondicionesPago.scss';

const CondicionesPago = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/condiciones-pago");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card condiciones-pago-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdPayment size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Condiciones de Pago</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CondicionesPago;
