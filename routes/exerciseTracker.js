var express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseTrackerController');

// Endpoint para inserir jogadores
router.post('/users', exerciseController.createUsers);

// Endpoint para inserir exercicios
router.post('/users/:_id/exercises', exerciseController.createExercises);

// Endpoint para ir buscar todos os users
router.get('/users', exerciseController.getUsers);

// Endpoint para ir buscar user by _id
router.get('/users/:_id', exerciseController.getUsers);

// Endpoint para ir buscar user by _id
router.get('/users/:_id/logs', exerciseController.getUserLog);




module.exports = router;
