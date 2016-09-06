hypathiaAcademy.controller('GradosController', ['$scope', '$state', 'grados', 'APIClient',
    function($scope, $state, grados, APIClient) {
    	
        //Scope init
        $scope.model = '';
        $scope.grados = '';
        $scope.asignaturasPre = '';
        $scope.asignaturas = [];
        $scope.asignaturas1 = [];
        $scope.asignaturas2 = [];
        var subarray = 0;
        
        if (grados.data) {
            if (grados.data.length === 0) {
                $scope.uiState = 'blank';

            } else {
                $scope.uiState = 'ideal';
                $scope.model = grados;
                $scope.grados = $scope.model.data;
                APIClient.getAsignaturas($scope.model.data.asignaturas_id).then(
                    function(data) {
                        $scope.asignaturasPre = data;

                        //CONTROL DE SEMESTRE --- CAMBIAR EL NUMERO DE LA PARTE IZQUIERDA DEL IF
                        var auxCuatri = $scope.asignaturasPre.length;
                        var startCuatri = 0;
                        while(startCuatri<auxCuatri){
                            if($scope.asignaturasPre[startCuatri].cuatri === 1 || $scope.asignaturasPre[startCuatri].cuatri === 3){
                                $scope.asignaturas = $scope.asignaturas.concat($scope.asignaturasPre[startCuatri]);
                                console.log("Miriam was here");
                            }
                            startCuatri++;
                        }

                        //CONTROL DE INTENSIVO --- DESCOMENTAR Y COMENTAR EL CONTROL DE SEMESTRE
                        /*var auxIntensivo = $scope.asignaturasPre.length;
                        var startIntensivo = 0;
                        while(startIntensivo<auxIntensivo){
                            if($scope.asignaturasPre[startIntensivo].intensivo === "y"){
                                $scope.asignaturas = $scope.asignaturas.concat($scope.asignaturasPre[startIntensivo]);
                            }
                            startIntensivo++;
                        } */

                        subarray = $scope.asignaturas.length/2;
                        $scope.asignaturas1 = $scope.asignaturas.slice(0, Math.floor(subarray));
                        $scope.asignaturas2 = $scope.asignaturas.slice(Math.floor(subarray), $scope.asignaturas.length);

                    },
                    function() {
                        alert('Error');
                    }
                );; //Continuar por aqui TODO

            }
        }

        /*** Scope methods ***/
        console.log("AAA", $scope.grados);
        console.log("asig", $scope.asignaturasPre);
        console.log("asig1", $scope.asignaturas1);
        console.log("asig2", $scope.asignaturas2);

        /*** Scope start ***/



    }
]);