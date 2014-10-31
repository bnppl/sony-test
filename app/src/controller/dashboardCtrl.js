/* global angular, restResource, console */
angular.module('sony.controller.dashboard',
  ['ui.router', 'sony.session.sessionManager'])

  .config(['$stateProvider', function config($stateProvider) {
      $stateProvider.state('dashboard', {
          url: '/dashboard',
          controller: 'dashboardCtrl',
          templateUrl: 'controller/dashboard.tpl.html'
        });
    }])
  .controller('dashboardCtrl', ['$scope', 'sessionManager',
      function ($scope, sessionManager) {

          console.log('dashbaord');
        }]);
