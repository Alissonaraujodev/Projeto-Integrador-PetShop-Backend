const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultasController');
const { autorizarVeterinario } = require('../middlewares/authMiddleware');

router.post('/consulta/criar',autorizarVeterinario, consultaController.criarConsulta);

module.exports = router;