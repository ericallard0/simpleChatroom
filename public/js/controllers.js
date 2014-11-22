'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  })
  .controller('ChatroomCtrl', function ($scope) {
    // write Ctrl here
  });