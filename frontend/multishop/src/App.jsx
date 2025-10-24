import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginPage from "@pages/LoginPage";
import HomePage from "@pages/HomePage";
import CreationPage from "@pages/CreationPage";
import PlanCuentas from "@pages/PlanCuentas";
import Auxiliares from "@pages/Auxiliares/";
import Categorias from "@pages/Categorias/";
import CategoriasCPO from "@pages/CategoriasCPO";
import CondicionesPago from "@pages/CondicionesPago/";
import AsignacionISRL from "@pages/AsignacionISRL/";
import Usuarios from "@pages/Usuarios/";
import CPO from "@pages/CPO/";
import CPODetails from "@pages/CPO/CPODetails";
import { AuthProvider } from "@context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/create" element={<CreationPage />}></Route>
              <Route path="/plan-cuentas" element={<PlanCuentas />}></Route>
              <Route path="/auxiliares" element={<Auxiliares />}></Route>
              <Route path="/categorias" element={<Categorias />}></Route>
              <Route path="/categorias-cpo" element={<CategoriasCPO />}></Route>
              <Route path="/condiciones-pago" element={<CondicionesPago />}></Route>
              <Route path="/asignacion-isrl" element={<AsignacionISRL />}></Route>
              <Route path="/usuarios" element={<Usuarios />}></Route>
              <Route path="/cpo" element={<CPO />}></Route>
              <Route path="/cpo/details/:id" element={<CPODetails />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
