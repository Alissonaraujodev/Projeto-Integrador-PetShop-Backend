const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');
const {autorizarAdministrador, autenticarToken} = require('../middlewares/authMiddleware')

router.post('/funcionarios/cadastro',autenticarToken ,autorizarAdministrador, funcionariosController.cadastrarFuncionario);
router.put('/funcionarios/atualizar/:id_profissional',autorizarAdministrador, funcionariosController.atualizarFuncionario);
router.put('/funcionarios/alterar-senha', funcionariosController.alterarSenhaFuncionario);
router.get('/funcionarios/listar', funcionariosController.listarProfissionais);
router.get('/funcionarios/por-categoria/:categoria', funcionariosController.listarPorCategoria);


module.exports = router;
