/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('sessionManager', function () {

  var sessionManager, $scope, deferred, $httpBackend,
  mockEndpoint = 'http://www.example.com/',
  loginResponseBody = {
    "expiryTime": 100000000,
    "sessionId": "fakeSessionId",
    "userId": "fakeUserId"
  },
  mockSessionStorage = {
    setSessionId: function () {},
    set: function () {}
  };

  beforeEach(function () {

    module('sony.session.sessionManager', function ($provide) {
      $provide.value('apiEndpoint', mockEndpoint);
      $provide.value('sessionStorage', mockSessionStorage);
    });
    this.addMatchers(
      {
        toEqualData: function (expected) {
          return angular.equals(this.actual, expected);
        }
      });

    inject(function (_sessionManager_, _$httpBackend_, $q, $rootScope) {
      $scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      sessionManager = _sessionManager_;
      deferred = $q.defer();
    });
  });

  it('should submit the username and password to the server', function () {

    //Arrange
    $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
    .respond(200, loginResponseBody);

    //Act
    sessionManager.login('username', 'pass');
    $httpBackend.flush();
    $scope.$apply();

    //Assertion by mock.
  });

  it('should return a promise that resolves with the user session data',
    function () {

      //Arrange
      $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
      .respond(200, loginResponseBody);
      var sessionData;

      //Act
      sessionManager.login('username', 'pass').then(function (response) {
        sessionData = response.data;
      });
      $httpBackend.flush();
      $scope.$apply();

      //Assert
      expect(sessionData).toEqualData(loginResponseBody);
    });

  it('should set the sessionId in the sessionStorage service',
    function () {

      //Arrange
      $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
      .respond(200, loginResponseBody);

      spyOn(mockSessionStorage, 'setSessionId');

      //Act
      sessionManager.login('username', 'pass');
      $httpBackend.flush();
      $scope.$apply();

      //Assert
      expect(mockSessionStorage.setSessionId)
      .toHaveBeenCalledWith('fakeSessionId');

    });

  it('should set the userId as a value on the session storage service',
    function () {

      //Arrange
      $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
      .respond(200, loginResponseBody);

      spyOn(mockSessionStorage, 'set');

      //Act
      sessionManager.login('username', 'pass');
      $httpBackend.flush();
      $scope.$apply();

      //Assert
      expect(mockSessionStorage.set)
      .toHaveBeenCalledWith('userId', 'fakeUserId');

    });

  it('should handle http errors by passing on the server error as a rejection',
    function () {

      //Arrange
      $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
      .respond(500, { reason: 'server error' });
      var errorResponse;

      //Act
      sessionManager.login('username', 'pass').catch(function (response) {
        errorResponse = response;
      });
      $httpBackend.flush();
      $scope.$apply();

      //Assert
      expect(errorResponse.data.reason).toEqual('server error');
      expect(errorResponse.status).toBe(500);
    });

});
