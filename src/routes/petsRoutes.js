const express = require('express');
const router = express.Router();
const petController = require('../controllers/petsController');

router.post('/pet/cadastro', petController.cadastrarPet);
router.get('/pets/meus', petController.listarPetsPorCliente);

module.exports = router;