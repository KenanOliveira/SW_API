angular.module('sw', ['ngRoute', 'ngSanitize']).config(
    function($routeProvider){
        //configuração da rota catalogo
        $routeProvider.when('/catalogo', {
            templateUrl: 'partials/catalogo.html',
            controller: 'catalogoCtrl'
        });
        //configuração da rota info
        $routeProvider.when('/info/:id', {
            templateUrl: 'partials/info.html',
            controller: 'infoCtrl'
        });
        //Caso recebe como parametro uma rota inexistente
        $routeProvider.otherwise('/catalogo');
    }
);