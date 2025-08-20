import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signIn, errorsAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  // Capturar errores del backend en cuanto cambien
  useEffect(() => {
    if (errorsAuth?.message) {
      setErrors({ form: errorsAuth.message });
    }
  }, [errorsAuth]);

  const validate = () => {
    const newErrors = {};
    
    // Validación de email o username
    if (!email) {
      newErrors.email = "El campo es requerido";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      !/^\w{3,}$/.test(email)
    ) {
      newErrors.email = "Formato inválido (usa email o nombre de usuario)";
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = "El campo es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // validación local
    
    await signIn({ email, password }); 
    // ahora NO revisamos erroresAuth aquí, lo hará el useEffect
  };

  return (
    <div className="login-page">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="card">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h1>Inicio de sesión</h1>
              <p className="signup-prompt">
                ¿Aún no tienes una cuenta? <a href="#">Créala aquí</a>
              </p>

              {errors.form && <div className="global-error">{errors.form}</div>}

              <div className="form-group">
                <label>Email o usuario</label>
                <input
                  type="text"   // 👈 importante: no uses "email" porque puede ser username
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email o usuario"
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
