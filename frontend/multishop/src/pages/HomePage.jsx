import React, { useState } from "react";
import NavbarSidebar from "../components/NavbarSidebar";
import Shortcuts from "../components/Home/Shortcuts";
import Indicators from "../components/Home/Indicators";
import "../styles/HomePage.scss";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("tap1");

  const renderContent = () => {
    switch (activeTab) {
      case "tap1":
        return <div className=""><Shortcuts /></div>;
      case "tap2":
        return <div className=""><Indicators /></div>;
      case "tap3":
        return <div className="">Contenido de Indicadores 2</div>;
      default:
        return null;
    }
  };

  return (
    <NavbarSidebar>
      <div className="page-container">
        <section className="home_content__shortcuts">
          <h1>Inicio</h1>
          <div className="buttons">
            <button
              className={activeTab === "tap1" ? "active" : ""}
              onClick={() => setActiveTab("tap1")}
            >
              <span>Accesos Directos</span>
            </button>
            <button
              className={activeTab === "tap2" ? "active" : ""}
              onClick={() => setActiveTab("tap2")}
            >
              <span>Indicadores</span>
            </button>
          </div>
        </section>

        <section className="home_content__indicators">
          <section className="tabs_section">{renderContent()}</section>
        </section>
      </div>
    </NavbarSidebar>
  );
};

export default HomePage;
