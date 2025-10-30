const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');
const {autorizarAdministrador} = require('../middlewares/authMiddleware')

router.post('/funcionarios/cadastro',autorizarAdministrador, funcionariosController.cadastrarFuncionario);
router.post('/funcionarios/login', funcionariosController.loginFuncionario);
router.put('/funcionarios/atualizar/:id_profissional',autorizarAdministrador, funcionariosController.atualizarFuncionario);
router.put('/funcionarios/alterar-senha', funcionariosController.alterarSenhaFuncionario);

module.exports = router;
