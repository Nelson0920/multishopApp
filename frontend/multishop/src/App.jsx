// Dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import ProtectedRoutes from "./ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreationPage from "./pages/CreationPage";
// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LoginPage />}></Route>

             {/* Rutas protegidas */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/create" element={<CreationPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
