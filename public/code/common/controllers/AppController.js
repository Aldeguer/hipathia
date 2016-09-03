hypathiaAcademy.controller('AppController', ['$scope', '$window', '$location', 'paths',
    function($scope, $window, $location, paths) {
        /*Controlador padre de nuestra App*/

        var controller = this;
        /*** controller properties ***/
        controller.titles = {};
        controller.titles[paths.url.home] = paths.titles.home;
        controller.titles[paths.url.universidades] = paths.titles.universidades;
        controller.titles[paths.url.detailUni] = paths.titles.detailUni;
        controller.titles[paths.url.grados] = paths.titles.grados;


        /*** scope init ***/
        $scope.model = {
            title: ''
        };

        /***Scope event listeners***/

        //Eventos que el controlador padre recibe cada vez que una url cambia y debe cambiar
        //el título de nuestra app.
        $scope.$on('$locationChangeSuccess', function() {
            //dar una vuelta para universidades/:id
            $scope.model.title = controller.titles[$location.path()] || '404 Not Found';
        });

        $scope.$on('ChangeTitle', function(title) {
            $scope.model.title = title;
        });

    }
]);
