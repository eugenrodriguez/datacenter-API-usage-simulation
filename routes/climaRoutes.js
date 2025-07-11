const express = require('express');
const router = express.Router();
const ClimaController = require('../controllers/ClimaController');

const controller = new ClimaController();

router.get('/actual', controller.getActual);
router.get('/historial', controller.getHistorial);
router.post('/temperatura', controller.postTemperatura);
router.post('/humedad', controller.postHumedad);

module.exports = router;
