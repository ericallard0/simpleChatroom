'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, socket) {
    $scope.user = {name:"", id:"", chatroom: 'default'};
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
    $scope.newChatroom = $scope.user.chatroom;
    $scope.addMessage = function(){
      socket.emit('message:new', {user: $scope.user, text: $scope.newMessage});
      $scope.newMessage = "";
    };
    $scope.goToChatroom = function(){
      $scope.messages = [];
      socket.emit('chatroom:change', {old: $scope.user.chatroom, new: $scope.newChatroom});
      $scope.user.chatroom = $scope.newChatroom;
    }
    socket.on('message:new', function(data){
      $scope.messages.push(data);
    });
  });