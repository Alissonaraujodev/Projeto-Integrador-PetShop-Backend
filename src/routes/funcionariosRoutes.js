const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');

router.post('/funcionarios/cadastro', funcionariosController.cadastrarFuncionario);
router.post('/funcionarios/login', funcionariosController.loginFuncionario);

module.exports = router;
