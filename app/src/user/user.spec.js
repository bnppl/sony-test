/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('user', function () {

  var user;

  beforeEach(function () {

    module('sony.user.user');

    inject(function (_user_) {
      user = _user_;
    });
  });

  it('should have all the necessary attributes', function () {
    //Arrange.
    var exampleUser = {
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

    //Assert.
    expect(user).toEqual(exampleUser);
  });

});
