/* global angular, console */

angular.module('sony.session.sessionManager',
  ['sony.session.sessionStorage'])

.factory('sessionManager', ['$http', 'apiEndpoint', 'sessionStorage',
    '$q',
    function ($http, apiEndpoint, sessionStorage, $q) {

      var sessionManager = {
        login: function (username, password) {

          var deferred = $q.defer();

          $http.get(apiEndpoint + 'signin/' + username + '/' + password)
          .then(function (result) {
            sessionStorage.setSessionId(result.data.sessionId);
            sessionStorage.set('userId', result.data.userId);
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
