/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('sessionManager', function () {

  var sessionManager, $scope, deferred, $httpBackend,
        mockEndpoint = 'http://www.example.com/',
        loginResponseBody = {
            "expiryTime": 100000000,
            "sessionId": "fakeSessionId",
            "userId": "fakeUserId"
        },
        mockSessionTokenStorage = {
            setSessionId: function () {}
        };

  beforeEach(function () {

    module('sony.user.sessionManager', function ($provide) {
        $provide.value('apiEndpoint', mockEndpoint);
        $provide.value('sessionTokenStorage', mockSessionTokenStorage);
    });
    this.addMatchers({
        toEqualData: function(expected) {
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

  it('should be an object', function () {
    //Assert
    expect(sessionManager).toBeTruthy();
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

  it('should set the sessionId in the sessionTokenStorage service',
    function () {

    //Arrange
    $httpBackend.expectGET(mockEndpoint + 'signin/username/pass')
      .respond(200, loginResponseBody);

    spyOn(mockSessionTokenStorage,'setSessionId');

    //Act
    sessionManager.login('username', 'pass');
    $httpBackend.flush();
    $scope.$apply();

    //Assert
    expect(mockSessionTokenStorage.setSessionId)
      .toHaveBeenCalledWith('fakeSessionId');

  });

});
