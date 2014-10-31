/* global angular */

angular.module('sony.session.sessionManager',
  ['sony.session.sessionTokenStorage'])

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
          },
          function (rejection) {
            deferred.reject(rejection);
          });

          return deferred.promise;
        }
      };

      return sessionManager;
    }]);
