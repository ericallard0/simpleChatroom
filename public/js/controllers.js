'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $scope.user = {name:"", id:""}
    $http.get('/api/id').success(function(data){
      $scope.user.id = data.id;
    });
  })
  .controller('LoginCtrl', function ($scope, $location) {
    $scope.name = "";
    $scope.login = function(){
      $scope.user.name = $scope.name;
      console.log($scope.user);
      $location.path("/chatroom");
    };
  })
  .controller('ChatroomCtrl', function ($scope, socket, $location) {
    if($scope.user.name === "")
      $location.path("/login")
    $scope.newMessage = "";
    $scope.messages = [];
    $scope.addMessage = function(){
      socket.emit('message:new', {user: $scope.user, text: $scope.newMessage});
      $scope.newMessage = "";
    };
    socket.on('message:new', function(data){
      $scope.messages.push(data);
    });
  });