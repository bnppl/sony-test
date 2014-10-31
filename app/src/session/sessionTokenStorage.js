/* global angular */

angular.module('sony.session.sessionTokenStorage', [])

.factory('sessionTokenStorage', ['$http', function ($http) {

      var sessionTokenStorage = {
        setSessionId: function (sessionId) {
          $http.defaults.headers.common['sessionId'] = sessionId;
        }
      };

      return sessionTokenStorage;
    }]);
