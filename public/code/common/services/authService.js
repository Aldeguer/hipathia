angular.module('hypathiaAcademy').service('authService', ['$location', '$injector', '$state',
    '$auth', 'APIClient', 'pubSubService',
    function($location, $injector, $state, $auth, APIClient, pubSubService) {

        /**Servicio que utilizamos para encapsular toda la lógica que tiene que ver con la
        autenticación de la app, tanto si es nativa como si es por google o facebook.
        Desde aquí llamaremos tanto a APICliente para el registro nativo, como a las llamadas
        que necesitemos de satellizer para el registro por facebook y google**/

        /**Función que guarda en el localStorage todo lo que recibimos de la API al loguearse 
        un usuario**/
        function saveLocalStorage(data) {
            //Guardo token en el local-storage
            localStorage.setItem('satellizer_token', data.token);
            //Guardo foto, nombre e id en el localstorage
            localStorage.setItem('fullname_user_login', data.fullname);
            localStorage.setItem('picture_user_login', data.picture);
            localStorage.setItem('id_user_login', data._id);
        }

        //Método que se llama cuando un usuario se loguea de forma nativa por nuestra app
        this.saveUserAuth = function(user) {
            APIClient.login(user).then(
                //El login es correcto
                function(data) {
                    //Ha ido bien, informo al servicio pubSub que haga el login para gestionar vistas
                    pubSubService.notifyLogin(data);

                    //Llamo a la función que me guarda los datos en el localStorage
                    saveLocalStorage(data);

                    //Informo al servicio pubSub para que el controlador del login
                    //gestione la lógica del login con o sin errores
                    pubSubService.notifyLoginErrors([false]);
                },

                //El servidor me informa de algún error al hacer el login
                function(data) {
                    //Informo al servicio pubSub para que el controlador del login
                    //gestione la lógica del login con o sin errores
                    pubSubService.notifyLoginErrors([true, data.err]);
                }

            );

        };

        //Método que se llama cuando un usuario se registra de forma nativa por nuestra app
        this.signup = function(signupData) {
            APIClient.signup(signupData).then(
                //Promesa aceptada
                function(data) {
                    //Ha ido bien, informo al servicio pubSub que haga el login para gestionar vistas
                    pubSubService.notifyLogin(data);

                    //Llamo a la función que me guarda los datos en el localStorage
                    saveLocalStorage(data);

                    //Informo al servicio pubSub para que el controlador del registro
                    //gestione la lógica del registro con o sin errores
                    pubSubService.notifySignupErrors([false]);
                },

                //Promesa rechazada
                function(data) {
                    //Informo al servicio pubSub para que el controlador del registro
                    //gestione la lógica del registro con o sin errores
                    pubSubService.notifySignupErrors([true, data.err]);
                }
            );
        };

        /*Método que realiza el logout borrando del localstorage el token, y avisando al servicio 
        pubsub para que informe que se ha realizado el logout y gestionar las vistas*/
        this.logout = function() {
            localStorage.removeItem('satellizer_token');
            localStorage.removeItem('fullname_user_login');
            localStorage.removeItem('picture_user_login');
            localStorage.removeItem('id_user_login');
            pubSubService.notifyLogout();
        };

        /*Método que devuelve el token que haya guardado en el local-storage*/
        this.getToken = function() {
            var local = localStorage.getItem('satellizer_token');
            return local;
        };

        this.getDataUserLogin = function() {
            var fullname = localStorage.getItem('fullname_user_login');
            var picture = localStorage.getItem('picture_user_login');
            var _id = localStorage.getItem('id_user_login');
            return { fullname: fullname, picture: picture, _id: _id };
        };

        /*Método que se llama cuando un usuario se loguea o registra pulsando botón de facebook
        o login*/
        this.authenticate = function(provider, origin) {

            //Guarda solo el token en el localstorage al recibir que todo ha ido bien.
            $auth.authenticate(provider).then(function(data) {
                    console.log('You have successfully signed in with ' + provider + '!');
                    //Ha ido bien, informo al servicio pubSub que haga el login para gestionar vistas
                    pubSubService.notifyLogin(data.data);

                    //Llamo a la función que me guarda los datos en el localStorage
                    saveLocalStorage(data.data);

                    if (origin === 'login') {
                        //Informo al servicio pubSub para que el controlador del login
                        //gestione la lógica del login con o sin errores
                        pubSubService.notifyLoginErrors([false]);
                    } else if (origin === 'signup') {
                        //Informo al servicio pubSub para que el controlador del registro
                        //gestione la lógica del registro con o sin errores
                        pubSubService.notifySignupErrors([false]);
                    }
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        if (origin === 'login') {
                            //Informo al servicio pubSub para que el controlador del login
                            //gestione la lógica del login con o sin errores
                            pubSubService.notifyLoginErrors([true, error.error.message]);
                        } else if (origin === 'signup') {
                            //Informo al servicio pubSub para que el controlador del registro
                            //gestione la lógica del registro con o sin errores
                            pubSubService.notifySignupErrors([true, error.error.message]);
                        }

                    } else if (error.data) {
                        // HTTP response error from server
                        if (origin === 'login') {
                            //Informo al servicio pubSub para que el controlador del login
                            //gestione la lógica del login con o sin errores
                            pubSubService.notifyLoginErrors([true, error.data.message]);
                        } else if (origin === 'signup') {
                            //Informo al servicio pubSub para que el controlador del registro
                            //gestione la lógica del registro con o sin errores
                            pubSubService.notifySignupErrors([true, error.data.message]);
                        }

                    } else {
                        if (origin === 'login') {
                            //Informo al servicio pubSub para que el controlador del login
                            //gestione la lógica del login con o sin errores
                            pubSubService.notifyLoginErrors([true, error.message]);
                        } else if (origin === 'signup') {
                            //Informo al servicio pubSub para que el controlador del registro
                            //gestione la lógica del registro con o sin errores
                            pubSubService.notifySignupErrors([true, error.message]);
                        }
                    }
                });
        };
    }
]);

