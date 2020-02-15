angular.module('sw').controller('catalogoCtrl', function($scope, $http){
    var urlServidor = "http://localhost:3000/filmes";
    //Realiza uma requisição dos dados
    $http.get(urlServidor).then(
        function(resposta){
            //recebe os índices do arquivo JSON
            var tam = parseInt(resposta.data.length)
            //Pegar o código do filme através da url
            for(x = 0; x < tam; x++){
                var a = ""
                a = resposta.data[x].url
                a = a.replace("https://swapi.co/api/films/","")
                a = a.replace("/","")
                //faz a substituição da valor anterior pelo novo (código)
                resposta.data[x].url = a
            }
            //Informações sobre os filmes
            $scope.filmes = resposta.data
            //Tela de aguardando
            $scope.aguarde = function(){
                return true;
            }
        }
    )
});
