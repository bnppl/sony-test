/* global angular */

angular.module('sony.user.userManager', [])

.factory('userManager', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {

    var userManager = {

      findById: function (userId) {
        return $http.get(apiEndpoint + 'profile/' + userId);
      }
    };

    return userManager;
  }]);

