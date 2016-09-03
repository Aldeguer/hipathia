hypathiaAcademy.controller('MenuController', ['$scope', '$state', 'APIClient',

    function($scope, $state, APIClient) {

        //Scope init
        $scope.model = '';
        $scope.uiState = '';

        /*** Scope methods ***/
        APIClient.getUniversidades().then(
            //ha ido bien
            function(data) {
                $scope.model = data;
                $scope.uiState = 'ideal'
            },

            //ha ido mal
            function(response) {
                $scope.uiState = 'blank';
            }
        );




        /*** Scope start ***/



    }
]);
