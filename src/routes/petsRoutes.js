const express = require('express');
const router = express.Router();
const petController = require('../controllers/petsController');
const {autorizarAdministrador} = require('../middlewares/authMiddleware')

router.post('/pet/cadastro', petController.cadastrarPet);
router.get('/pets/meus', petController.listarPetsPorCliente);
router.get('/pets/todos',autorizarAdministrador, petController.listarTodosPets);

module.exports = router;