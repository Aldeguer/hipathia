hypathiaAcademy.service('pubSubService', ['$rootScope',
    function($rootScope) {

        /*** Servicio pubSub, que implementamos para que en cualquier punto del cliente, un componente
        pueda comunicar cualquier cosa a otro componente sin mirar nada de que sean padres, hermanos...
        Únicamente utilizamos un proceso de subscribirse y notificar un evento***/

        return {

            /***Evento para notificar que un usuario se ha logueado***/
            subscribeLogin: function(scope, callback) {
                var handler;
                handler = $rootScope.$on('login', callback);
            },

            notifyLogin: function(dataLogin) {
                $rootScope.$emit('login', dataLogin);
            },

            /***Evento para notificar que un usuario ha hecho logout***/
            subscribeLogout: function(scope, callback) {
                var handler;
                handler = $rootScope.$on('logout', callback);
            },

            notifyLogout: function() {
                $rootScope.$emit('logout');
            },

            /***Evento para notificar que hemos recibido la respuesta de la api en nuestro servicio
            y que el controlador del login se entere para gestionar la parte visual y lógica según
            vengan errores o no***/
            subscribeLoginErrors: function(scope, callback) {
                var handler;
                handler = $rootScope.$on('loginErrors', callback);
            },

            notifyLoginErrors: function(dataErrors) {
                $rootScope.$emit('loginErrors', dataErrors);
            },

            /***Evento para notificar que hemos recibido la respuesta de la api en nuestro servicio
            y que el controlador del registro se entere para gestionar la parte visual y lógica según
            vengan errores o no***/
            subscribeSignupErrors: function(scope, callback) {
                var handler;
                handler = $rootScope.$on('signupErrors', callback);
            },

            notifySignupErrors: function(dataErrors) {
                $rootScope.$emit('signupErrors', dataErrors);
            },

            notifyLanguage: function(key) {
                $rootScope.$emit('subscribeLanguage', key);
            },

            subscribeLanguage: function(scope, callback) {
                var handler;
                handler = $rootScope.$on('subscribeLanguage', callback);
            }
        };
    }
]);

