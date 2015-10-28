'use strict';

/**
 * @ngdoc overview
 * @name contact
 * @description # contactApp
 *
 * Main module of the application.
 */
angular.module('contact', [
    'ngRoute',
    'firebase'
])
.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'views/main.html',
    controller : 'MessageCtrl'
  }).when('/login', {
    templateUrl : 'views/login.html',
    controller : 'MessageBoardCtrl'
  }).otherwise({
    redirectTo : '/'
  });
})
.value('fbURL', 'https://popping-fire-9893.firebaseio.com/')
.value('fbChildPath', 'requestMessages')
.controller('MessageCtrl', function ($scope, Messages) {
  $scope.requestMessage = {};
  $scope.messages = Messages.fetch();

  $scope.addNew = function () {
    $scope.messages.$add($scope.requestMessage).then(function () {
      $scope.requestMessage = {};
    });
  };
})
.controller('MessageBoardCtrl', function ($scope, Messages) {
  $scope.messages = Messages.fetch();
})
.service('Messages', function ($firebaseArray, fbURL, fbChildPath) {
  var fbInstance;

  this.init = function () {
    fbInstance = new Firebase(fbURL);
  };

  this.fetch = function () {
    if (!fbInstance) {
      this.init();
    }
    return $firebaseArray(fbInstance.child(fbChildPath));
  };
});