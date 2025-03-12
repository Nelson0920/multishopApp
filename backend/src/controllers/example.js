const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ruta de ejemplo'
  });
});


module.exports = router;