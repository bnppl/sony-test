/* global angular */

angular.module('sony.user.sessionManager', [])

  // .factory('sessionTokenStorage', ['$http', function ($http) {

  // })
  .factory('sessionManager', ['$http', 'apiEndpoint', 'sessionTokenStorage',
          '$q',
          function ($http, apiEndpoint, sessionTokenStorage, $q) {

        var sessionManager = {
          login: function (username, password) {

             var deferred = $q.defer();

              $http.get(apiEndpoint + 'signin/' + username + '/' + password)
                .then(function (result) {
                    sessionTokenStorage.setSessionId(result.data.sessionId);
                    deferred.resolve(result);
                });

             return deferred.promise;

          }
        };

        return sessionManager;
      }]);
