hypathiaAcademy.controller('ContactoController', ['$scope', '$state', 'APIClient',
    function($scope, $state, APIClient) {

        //Scope init
        $scope.model = '';
        $scope.hiddenGood = false
        $scope.hiddenBad = false

        /*** Scope methods ***/
        $scope.save = function() {
            APIClient.sendEmail($scope.model).then(
                function(data) {
                    $scope.hiddenGood = true;
                },
                function() {
                    $scope.hiddenBad = true;

                }
            )
        }





    }
]);
