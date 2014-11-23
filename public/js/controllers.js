'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, socket) {
    $scope.user = {name:"", id:""};
    $scope.users = [];
    $http.get('/api/id').success(function(data){
      $scope.user.id = data.id;
    });
    socket.on("users:add", function(data){
      $scope.users = data;
      console.log($scope.users);
    });
  })
  .controller('LoginCtrl', function ($scope, socket, $location) {
    $scope.name = "";
    $scope.login = function(){
      $scope.user.name = $scope.name;
      console.log($scope.user);
      socket.emit("users:add", $scope.user);
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
    $scope.privatemessage = function(){
      socket.emit('privatemessage', {
        to: $scope.to,
        message:{user: $scope.user, text: $scope.newMessage}
      });
      $scope.newMessage = "";
    }
    socket.on('message:new', function(data){
      $scope.messages.push(data);
    });
  });