var express = require('express');
var router = express.Router();

var filmes = require('../controllers/filmes');

/* GET home page. */
//Rotas que podem ser solicitadas a partir do controller filmes
//Busca todos os filmes
router.get('/filmes', filmes.listaTodos);
//busca filme específico
router.get('/filmes/:id', filmes.buscaFilme);
//busca detalhes do filme
router.get('/detalhes/:id', filmes.detalhes);

module.exports = router;
