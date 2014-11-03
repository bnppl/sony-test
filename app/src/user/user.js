/* global angular */

angular.module('sony.user.user', [])

.factory('user', [function () {

    var user = {
      "password": null,
      "username": null,
      "genderIsFemale": null,
      "age": null,
      "firstName": null,
      "lastName": null,
      "notes": null,
      "phoneNumber": null,
      "userId": null
    };

    return user;
  }]);
