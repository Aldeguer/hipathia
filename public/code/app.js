var hypathiaAcademy = angular.module('hypathiaAcademy', ['ui.router', 'URL', 'ngSanitize']);
//Router
hypathiaAcademy.config(['$stateProvider', '$urlRouterProvider', 'paths', 'apiPaths',

    function($stateProvider, $urlRouterProvider, paths, apiPaths) {

        $stateProvider
            .state('home', {
                url: paths.url.home,
                templateUrl: 'code/Home/HomeView.html',
                controller: 'HomeController',
            })
            .state('universidades', {
                url: paths.url.universidades,
                templateUrl: 'code/Universidades/Universidades/UniversidadesView.html',
                controller: 'UniversidadesController',
                resolve: {
                    universidades: function(APIClient) {
                        return APIClient.getUniversidades().then(
                            //ha ido bien
                            function(data) {
                                return { data: data };
                            },

                            //ha ido mal
                            function(response) {
                                return { err: response.err };
                            }
                        );
                    }
                }
            })
            .state('uniDetail', {
                url: paths.url.detailUni,
                templateUrl: 'code/Universidades/UniDetail/UniDetailView.html',
                controller: 'UniDetailController',
                params: {
                    _id: null
                },
                resolve: {
                    //No se como controlar de esta forma si vienen errores de la BD
                    universidad: function(APIClient, $stateParams) {
                        var uniId = $stateParams._id;
                        return APIClient.getUniById(uniId).then(
                            //ha ido bien
                            function(data) {
                                return { data: data };
                            },

                            //ha ido mal
                            function(response) {
                                return { err: response.err };
                            }
                        );
                    }
                }
            })

            .state('grados', {
                url: paths.url.grados,
                templateUrl: 'code/Grados/GradosView.html',
                controller: 'GradosController',
                params: {
                    _id: null
                },
                resolve: {
                    //No se como controlar de esta forma si vienen errores de la BD
                    grados: function(APIClient, $stateParams) {
                        var gradoId = $stateParams._id;
                        return APIClient.getGradoById(gradoId).then(
                            //ha ido bien
                            function(data) {
                                return { data: data };
                            },

                            //ha ido mal
                            function(response) {
                                return { err: response.err };
                            }
                        );
                    }
                }
            })

            .state('contacto', {
                url: paths.url.contacto,
                templateUrl: 'code/Contacto/ContactoView.html',
                controller: 'ContactoController',
            });


    }
]);
