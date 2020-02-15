var requestify = require('requestify');
//Lista todos os filmes
module.exports.listaTodos = function(req, res){
    requestify.get("https://swapi.co/api/films/").then(
        function(resposta){
            var filmes = JSON.parse(resposta.body);
            res.json(filmes.results);
        },
        //Caso não seja possível buscar a informação
        function(erro){
            res.status(500).json(erro);
        }
    );
};

//Busca um filme pelo seu id
module.exports.buscaFilme = function(req, res){
    var id = req.params.id+"/";
    requestify.get("https://swapi.co/api/films/"+id).then(
        function(resposta){
            var filmes = JSON.parse(resposta.body);
            res.json(filmes);
        },
        //caso o filme não seja encontrado
        function(erro){
            res.status(404).json(erro);
        }
    );
};

//Busca detalhes do filme como personagens, planetas e etc.
module.exports.detalhes = function(req, res){
    var id = req.params.id+"/";
    requestify.get("https://swapi.co/api/films/"+id).then(
        function(resposta){
            var filme = JSON.parse(resposta.body);
            buscar(filme.characters,"personagem");
            buscar(filme.planets, "planetas");
            buscar(filme.species, "especies");
            buscar(filme.starships, "naves");
        }
    );
    //JSON que recebe as informações
    var data = {};

    //Função receber e organizar as informações
    var organiza = function(info,classe){
        //Se personagem
        if(classe == "personagem"){
            data.info_per = info;
        }
        //Se planeta
        if(classe == "planetas"){
            data.info_pla = info;
        }
        //Se espécie
        if(classe == "especies"){
            data.info_esp = info;
        }
        //Se nave
        if(classe == "naves"){
            data.info_nave = info;
        }
        //Se todos contiverem informações é enviado para o client
        if(data.info_per != null && data.info_pla != null && data.info_nave != null && data.info_esp != null){
            res.json([{"personagem":data.info_per},{"planeta":data.info_pla},{"nave":data.info_nave},{"especie": data.info_esp}]);
        }
    }
    //Função de busca de informações
    var buscar = function(param, classificacao){
        //quantidade de itens no arquivo
        var tam = param.length;
        //array para armazenar dados
        let array = [];
        //informação par o loop
        var n = tam-1;
        //contar vezes loop
        var cont = 0;
        //laço de repetição para receber os dados e registrar o nome do objeto no array
        while(n >= 0){
            requestify.get(param[n]).then(
                function(resposta){
                    var dados = JSON.parse(resposta.body);
                    array.push({'nome': dados.name});
                    cont += 1;
                    //se tam == cont leva esses dados para organiza
                    if(cont == tam){
                        organiza(array,classificacao);
                    }
                }
            );
            n = (n - 1);
        }
    }
};