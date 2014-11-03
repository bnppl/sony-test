/* global angular */

angular.module('sony.session.sessionStorage', [])

.factory('sessionStorage', ['$http', function ($http) {

      var keyValueStore = {};
      var sessionStorage = {
        setSessionId: function (sessionId) {
          $http.defaults.headers.common['sessionId'] = sessionId;
        },

        set: function (key, value) {
          keyValueStore[key] = value;
        },

        get: function (key) {
          return keyValueStore[key];
        }
      };

      return sessionStorage;
    }]);
