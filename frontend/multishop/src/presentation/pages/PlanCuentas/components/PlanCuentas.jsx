import React from "react";
import { useNavigate } from "react-router-dom";
import { PiChartBarFill } from "react-icons/pi";
import '../PlanCuentas.scss';

const PlanCuentas = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/plan-cuentas");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card plan-cuentas-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <PiChartBarFill size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Plan de Cuentas</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default PlanCuentas;