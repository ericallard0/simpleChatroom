'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('AppCtrl', function ($scope, $http, socket) {
    $scope.user = {name:"", id:"", chatroom: 'default'};
    $scope.users = [];
    var convertUsersToArray = function(users){
      $scope.users = [];
      for(var k in users){
        $scope.users.push(users[k]);
      }
    };
    $http.get('/api/id').success(function(data){
      $scope.user.id = data.id;
    });
    socket.on("users:add", function(data){
      convertUsersToArray(data);
    });
    socket.on("users:remove", function(data){
      convertUsersToArray(data);
    });
  })

  .controller('LoginCtrl', function ($scope, socket, $location) {
    $scope.name = "";
    $scope.login = function(){
      $scope.user.name = $scope.name;
      console.log($scope.user);
      socket.emit("users:add", $scope.user);
      $location.path("/dashboard");
    };
  })

  .controller('DashboardCtrl', function ($scope, socket, $location) {
    if($scope.user.name === "")
      $location.path("/login")
    $scope.selectedUsers = [];
    $scope.invitations = [];
    $scope.selectUser = function(user){
      if($scope.selectedUsers.indexOf(user) === -1 && user.id != $scope.user.id)
        $scope.selectedUsers.push(user);
    };
    $scope.unselectUser = function(user){
      var index = $scope.selectedUsers.indexOf(user);
      if(index != -1){
        var tail = $scope.selectedUsers.slice(index+1)
        $scope.selectedUsers.splice(index).concat(tail);
      }
    };
    $scope.goToChatroom = function(chatroom){
      var old = $scope.user.chatroom;
      $scope.user.chatroom = chatroom;
      socket.emit("chatroom:change", {new: chatroom, old: old});
      $location.path("/chatroom");
    }
    $scope.invite = function(){
      socket.emit("chatroom:invite", {user: $scope.user, selected: $scope.selectedUsers});
    }
    socket.on('chatroom:new', function(data){
      $scope.user.chatroom = data.chatroom;
      $location.path("/chatroom");
    });
    socket.on("chatroom:invite", function(data){
      $scope.invitations.push(data);
    });
  })  
  
  .controller('ChatroomCtrl', function ($scope, socket, $location) {
    if($scope.user.name === "")
      $location.path("/login")
    $(":file").filestyle({input: false, buttonText: ""});
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