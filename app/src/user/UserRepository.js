/* global angular */

angular.module('sony.user.userRepository', [])

  .factory('userRepository', [function () {

        var userRepository = {
          findByCredentials: function (username, password) {
            return {};
          }
        };

        return userRepository;
      }]);

