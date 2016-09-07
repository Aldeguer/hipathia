hypathiaAcademy.controller('ContactoController', ['$scope', '$state', 'APIClient',
    function($scope, $state, APIClient) {

        //Scope init
        $scope.model = '';


        /*** Scope methods ***/
        $scope.save = function() {
            APIClient.sendEmail($scope.model) .then(
                    function(data) {
                      alert('Email send');
                    },
                    function() {
                        alert('Error');
                    }
                )
        }





    }
]);
