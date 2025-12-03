const express = require('express');
const router = express.Router();
const petController = require('../controllers/petsController');
const {autorizarAdministrador, autorizarVeterinario, autenticarToken} = require('../middlewares/authMiddleware')

router.post('/pet/cadastro', autenticarToken, petController.cadastrarPet);
router.get('/pets/meus',autenticarToken, petController.listarPetsPorCliente);
router.get('/pets/todos',autorizarAdministrador, petController.listarTodosPets);
router.put('/pet/atualizar-cliente/:id_pet', petController.atualizarPetCliente);
router.put('/pet/atualizar-veterinario/:id_pet', autorizarVeterinario, petController.atualizarPetVeterinario);

module.exports = router;