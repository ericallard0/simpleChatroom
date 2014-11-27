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
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard',
      controller: 'DashboardCtrl'
    })
    .when('/chatroom', {
      templateUrl: 'partials/chatroom',
      controller: 'ChatroomCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });

  $locationProvider.html5Mode(true);
});
