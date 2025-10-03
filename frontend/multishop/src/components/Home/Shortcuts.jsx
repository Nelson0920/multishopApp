import React from "react";
import "../../styles/Shortcuts.scss";
import Auxiliares from "./Auxiliares";
import PlanCuentas from "./PlanCuentas";
import Categorias from "./Categorias";

const Shortcuts = () => {
  const progress = 5;
  const total = 9;
  const percentage = Math.round((progress / total) * 100);

  return (
    <>
      <div className="shortcuts_section">
        <div className="shortcuts_left">
          <h2 className="shortcuts_title">
            Te damos la bienvenida, ¿Qué deseas hacer?
          </h2>

          <div className="card_grid">
            <Auxiliares />
            <PlanCuentas />
            <Categorias />
          </div>
        </div>

        <div className="shortcuts_right">
          <h3 className="right_title">Guías de configuración</h3>

          <div className="progress_container">
            {Array(3).fill(null).map((_, index) => (
              <div className="progress_scroll_content" key={index}>
                <div className="progress_card">
                  <div className="circular_progress">
                    <svg viewBox="0 0 36 36" className="circular_chart">
                      <path
                        className="circle_bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="18" className="percentage">
                        {percentage}%
                      </text>
                    </svg>
                    <div className="fraction">
                      {progress} de {total}
                    </div>
                  </div>

                  <div className="progress_details">
                    <h4>Progreso de configuración</h4>
                    <button>Configurar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shortcuts;
