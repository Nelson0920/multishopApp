import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};
    if (!email) {
      newErrors.email = 'El campo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/^\w{3,}$/.test(email)) {
      newErrors.email = 'Formato inválido';
    }
    if (!password) {
      newErrors.password = 'El campo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/home');
    }
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

              <div className="form-group">
                <label>Email o usuario</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error">{errors.password}</span>}
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
