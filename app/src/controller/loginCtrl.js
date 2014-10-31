/* global angular, restResource, console */
angular.module('sony.controller.login',
  ['ui.router', 'sony.session.sessionManager'])

  .config(['$stateProvider', function config($stateProvider) {
      $stateProvider.state('login', {
          url: '/login',
          controller: 'loginCtrl',
          templateUrl: 'controller/login.tpl.html'
        });
    }])
  .constant('apiEndpoint', 'http://217.18.25.29:10070/')
  .controller('loginCtrl', ['$scope', 'sessionManager',
      function ($scope, sessionManager) {

        $scope.username = '';
        $scope.password = '';
        $scope.errorMessage = '';

        $scope.submitLoginDetails = function (form) {

          if (form.$valid) {
            sessionManager.login($scope.username, $scope.password).then(
              function (response) {
                console.log('login success');
              },
              function (rejection) {
                $scope.errorMessage = rejection.data.msg;
              }
            );
          }
          else {
            $scope.errorMessage = "Please enter your username and password";
          }

        };
      }]);
