import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAssignment } from "react-icons/md";
import '../AsignacionISRL.scss';

const AsignacionISRL = () => {
      const navigate = useNavigate();

      const handleOpenModal = () => {
            navigate("/asignacion-isrl");
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card asignacion-isrl-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdAssignment size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Concepto Retención ISRL</h3>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default AsignacionISRL;
