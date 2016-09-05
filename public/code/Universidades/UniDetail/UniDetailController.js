hypathiaAcademy.controller('UniDetailController', ['$scope', '$state', 'universidad', 'APIClient',
    function($scope, $state, universidad, APIClient) {
        
        //Scope init
        $scope.model = '';
        $scope.campus = '';
        $scope.grados = '';
        var idGrados = [];
        var idGradosDef = [];
        $scope.campus1 = [];
        $scope.campus2 = [];
        var subarray = 0;
          
            if (universidad.data) {
                if (universidad.data.length === 0) {
                    $scope.uiState = 'blank';

                } else {
                    $scope.uiState = 'ideal';
                    $scope.model = universidad;
                    APIClient.getCampus($scope.model.data.campus_id).then(
                        function(data){
                            $scope.campus = data;
                            subarray = $scope.campus.length/2;
                            $scope.campus1 = $scope.campus.slice(0, Math.floor(subarray));
                            $scope.campus2 = $scope.campus.slice(Math.floor(subarray), $scope.campus.length);
                            
                            var max = $scope.campus.length-1;
                            var cnt = 0;
                            console.log(max);
                            for (var i = 0; max; i++){
                                idGrados = idGrados.concat($scope.campus[i].grados_id);

                                if(++cnt === max){
                                    var aux = idGrados.length;
                                    var start = 0;
                                    while(start<aux){
                                        if(idGradosDef.indexOf(idGrados[start]) === -1){
                                            idGradosDef = idGradosDef.concat(idGrados[start]);
                                        }
                                        start++;
                                    }

                                    APIClient.getGrados(idGradosDef).then(
                                        function(data){   
                                            $scope.grados = data;
                                            //TODO por aqui va el true so sigue aqui
                                    },
                                    function(){
                                        alert('Error');
                                    }
                                );; 
                            }
                        }
                     

                    },
                    function(){
                        alert('Error');
                    }
                    );;

                }   
            }
         
        /*** Scope methods ***/
        console.log("CAMPUS", $scope.campus);
        console.log("CAMPUS1", $scope.campus1);
        console.log("CAMPUS2", $scope.campus2);
        console.log("GRADOS", $scope.grados);
        /*** Scope start ***/

     

    }
]);
