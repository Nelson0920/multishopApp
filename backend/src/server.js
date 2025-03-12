const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

// ** Puerto **
const PORT = process.env.PORT || 3001;

// ** Middleware **
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ** Rutas **
app.use('/api', routes);

// ** Manejo de errores 404 **
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ** Manejo de errores generales **
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

// ** Iniciar el servidor **
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
