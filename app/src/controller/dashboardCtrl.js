/* global angular, restResource, console */
angular.module('sony.controller.dashboard',
  ['ui.router',
    'sony.session.sessionManager',
    'sony.user.userManager'
  ])

  .config(['$stateProvider', function config($stateProvider) {
      $stateProvider.state('dashboard', {
          url: '/dashboard',
          controller: 'dashboardCtrl',
          templateUrl: 'controller/dashboard.tpl.html'
        });
    }])
  .controller('dashboardCtrl', ['$scope', 'sessionStorage', 'userManager',
      function ($scope, sessionStorage, userManager) {

        $scope.user = userManager.findById(sessionStorage.get('userId'));

      }]);
