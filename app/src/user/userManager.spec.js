/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('userManager', function () {

  var userManager, $httpBackend, $scope,
  mockEndpoint = 'http://www.example.com/';

  beforeEach(function () {

    module('sony.user.userManager', function ($provide) {
      $provide.value('apiEndpoint', mockEndpoint);
    });

    this.addMatchers(
      {
        toEqualData: function (expected) {
          return angular.equals(this.actual, expected);
        }
      });

    inject(function (_userManager_, _$httpBackend_, $rootScope) {
      userManager = _userManager_;
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
    });
  });

  it('should return a response that resolves to a valid user object when ' +
      'given a valid user id', function () {
    //Arrange.
    var userId = "3869cb99-d7de-46e0-b9f5-401b4854ec78",
    user,
    mockUserData = {
      "password": "password",
      "username": "alex",
      "genderIsFemale": false,
      "age": 0,
      "firstName": "alex",
      "lastName": "testuser",
      "notes": null,
      "phoneNumber": "0777999666",
      "userId": "3869cb99-d7de-46e0-b9f5-401b4854ec78"
    };
    $httpBackend.expectGET(mockEndpoint + 'profile/' + userId)
    .respond(200, mockUserData);

    //Act.
    userManager.findById(userId).then(function (result) {
      user = result.data;
    });
    $httpBackend.flush();
    $scope.$apply();

    //Assert.
    expect(user).toEqualData(mockUserData);
  });

  it('should reject the returned promise with the http rejection if there is ' +
      'one', function () {
    //Arrange.
    var userId = "3869cb99-d7de-46e0-b9f5-401b4854ec78",
    user,
    errorData = {
      msg: 'not found.'
    };
    $httpBackend.expectGET(mockEndpoint + 'profile/' + userId)
    .respond(404, errorData);

    //Act.
    userManager.findById(userId).catch(function (result) {
      user = result.data;
    });
    $httpBackend.flush();
    $scope.$apply();

    //Assert.
    expect(user).toEqualData(errorData);
  });

});
