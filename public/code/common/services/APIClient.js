angular.module('hypathiaAcademy').service('APIClient', ['$window', '$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {

        /** Servicio que nos sirve para comunicar el cliente con nuestro servidor, aquí irán
        todas las llamadas que tengamos que hacer a nuestra API, para que se puedan hacer desde 
        cualquier parte del cliente **/

        // Server requests
        this.getRequest = function(url) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .get(url)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        this.postRequest = function(url, item) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .post(url, item)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        this.putRequest = function(url, item) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .put(url, item)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        this.deleteRequest = function(url, item) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .delete(url, item)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        //Autentication Request
        this.getUniversidades = function() {
            return this.getRequest(apiPaths.universidades);
        };


        this.getUniById = function(uniId) {
            var url = URL.resolve(apiPaths.universidad, { id: uniId });
            return this.getRequest(url);
        };

        this.getGradoById = function(gradoId) {
            var url = URL.resolve(apiPaths.grado, { id: gradoId });
            return this.getRequest(url);
        };

       this.getCampus = function(arrayIdCampus) {
            return this.postRequest(apiPaths.campus, arrayIdCampus);
        };

        this.getGrado = function() {
            return this.getRequest(apiPaths.grados);
        };

       this.getGrados = function(arrayIdGrados) {
            return this.postRequest(apiPaths.grados, arrayIdGrados);
        };

        this.getAsignaturas = function(arrayIdAsignaturas) {
            return this.postRequest(apiPaths.asignaturas, arrayIdAsignaturas);
        };

        this.putUser = function(userId, item) {
            var url = URL.resolve(apiPaths.user, { id: userId });
            return this.putRequest(url, item);
        };

        this.getAdvertById = function(advertId) {
            var url = URL.resolve(apiPaths.advert, { id: advertId });
            return this.getRequest(url);
        };

        this.getAdvertsByOwner = function(userId) {
            var url = apiPaths.adverts + '?owner=' + userId;
            return this.getRequest(url);
        };

        this.getAdvertsByFav = function(arrayIdAdvertsFav) {
            return this.postRequest(apiPaths.advertsFav, arrayIdAdvertsFav);
        };

        this.getAdverts = function() {
            return this.getRequest(apiPaths.adverts);
        };

        this.modifyAdvert = function(advertId, item) {
            var url = URL.resolve(apiPaths.advert, { id: advertId });
            return this.putRequest(url, item);
        };

        this.deleteAdvert = function(advertId, item) {
            var url = URL.resolve(apiPaths.advert, { id: advertId });
            return this.putRequest(url, item);
        };
    }
]);

