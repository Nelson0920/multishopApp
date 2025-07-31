import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/HomePage.scss";
import Shortcuts from "../components/Home/Shortcuts";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("tap1");

  const renderContent = () => {
    switch (activeTab) {
      case "tap1":
        return <div className="tab_content"><Shortcuts/></div>;
      case "tap2":
        return <div className="tab_content">Contenido de Indicadores 1</div>;
      case "tap3":
        return <div className="tab_content">Contenido de Indicadores 2</div>;
      default:
        return null;
    }
  };

  return (
    <div className="main_container">
      <Sidebar />
      <section className="home_content">
        <Navbar />

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

        <section className="tabs_section">{renderContent()}</section>
      </section>
    </div>
  );
};

export default HomePage;
