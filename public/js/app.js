'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.services',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/chatroom', {
      templateUrl: 'partials/chatroom',
      controller: 'ChatroomCtrl'
    })
    .otherwise({
      redirectTo: '/chatroom'
    });

  $locationProvider.html5Mode(true);
});
