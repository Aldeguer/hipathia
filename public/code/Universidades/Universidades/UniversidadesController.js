hypathiaAcademy.controller('UniversidadesController', ['$scope', '$state','$stateParams','universidades',
    function($scope, $state,$stateParams,universidades ) {

        //Scope init
        $scope.model ='' ;
        $scope.id = '';
          if (universidades.data) {
            if (universidades.data.length === 0) {
                $scope.uiState = 'blank';

            } else {
                $scope.uiState = 'ideal';
                $scope.model = universidades;
            }
        }
     
        /*** Scope methods ***/

       

        /*** Scope start ***/

     

    }
]);
