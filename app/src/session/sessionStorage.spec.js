/* global angular, spyOn, describe, it, inject, beforeEach, module, expect */

describe('sessionStorage', function () {
  var sessionStorage,
  mockHttp = {
    defaults: {
      headers: {
        common: {}
      }
    }
  };

  beforeEach(function () {

    module('sony.session.sessionStorage', function ($provide) {
      $provide.value('$http', mockHttp);
    });
    inject(function (_sessionStorage_) {
      sessionStorage = _sessionStorage_;
    });
  });

  it('should set the session id on the http headers', function () {
    //Act
    sessionStorage.setSessionId('testSessionId');

    //Assert
    expect(mockHttp.defaults.headers.common['sessionId'])
      .toEqual('testSessionId');

  });

  it('should allow the storage of data by key => value', function () {
    //Arrange.
    sessionStorage.set('key', 'value');

    //Act.
    var value = sessionStorage.get('key');

    //Arrange.
    expect(value)
      .toEqual('value');

  });
});
