angular.module('sw').controller('infoCtrl', function($scope, $http, $routeParams){
    //recebe um id
    $scope.carregaInfo = function(){
        return true;
    }
    var carregaInfo = function(id){
        var urlServidor = "http://localhost:3000/filmes/";
        //executa a função para requisição dos dados e retorna um JSON
        $http.get(urlServidor+id).then(
            function(resposta){
                //informações sobre o filme
                $scope.info = resposta.data;
                //Titulo da pagina
                $scope.titulo = resposta.data.title +" - Minha Busca";
            },
            function(erro){
                if(erro.status == 404){
                    window.location.assign("#!/catalogo");
                }
            }
        );
        var urlServer = "http://localhost:3000/detalhes/";
        //requisição de dados
        $http.get(urlServer+id).then(
            function(resposta){
                var dados = resposta.data;
                //Lista dos personagens
                $scope.personagem = dados[0].personagem;
                //Lista dos planetas
                $scope.planeta = dados[1].planeta;
                //Lista das naves
                $scope.nave = dados[2].nave;
                //Lista das espécies
                $scope.especie = dados[3].especie;
                //Quando as informações forem carregadas exibe a página
                $scope.carregaInfo = function(){
                    return false;
                }
                //tela de aguardando
                $scope.aguarde = function(){
                    return true;
                }
            }
        );
    }
    //captura um id enviado a página
    if($routeParams.id){
        carregaInfo($routeParams.id);
    }
});