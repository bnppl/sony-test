/* global describe, it, inject, beforeEach, module, expect */

describe('userRepository', function () {

  var userRepository, $scope, deferred;

  beforeEach(function () {

    module('sony.user.userRepository');

    inject(function (_userRepository_, $q, $rootScope) {
      $scope = $rootScope.$new();
      userRepository = _userRepository_;
      deferred = $q.defer();
    });
  });

  it('should be an object', function () {
    //Assert
    expect(userRepository).toBeTruthy();
  });

});
