const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');
const {autorizarAdministrador} = require('../middlewares/authMiddleware')

router.post('/funcionarios/cadastro',autorizarAdministrador, funcionariosController.cadastrarFuncionario);
router.post('/funcionarios/login', funcionariosController.loginFuncionario);

module.exports = router;
