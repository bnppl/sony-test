/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('sessionTokenStorage', function () {
  var sessionTokenStorage,
  mockHttp = {
    defaults: {
      headers: {
        common: {}
      }
    }
  };

  beforeEach(function () {

    module('sony.session.sessionTokenStorage', function ($provide) {
      $provide.value('$http', mockHttp);
    });
    inject(function (_sessionTokenStorage_) {
      sessionTokenStorage = _sessionTokenStorage_;
    });
  });

  it('should set the session id on the http headers', function () {
    //Act
    sessionTokenStorage.setSessionId('testSessionId');

    //Assert
    expect(mockHttp.defaults.headers.common['sessionId'])
      .toEqual('testSessionId');

  });
});
