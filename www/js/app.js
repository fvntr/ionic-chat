// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'btford.socket-io'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login',{
      url: '/login', 
      templateUrl: 'templates/login.html'
    })
    .state('chat', {
      url:'/chat/:nickname',
      templateUrl: 'templates/chat.html'
    });

  $urlRouterProvider.otherwise('/login');


})

.factory('Socket', function (socketFactory) {
  var myIoSocket = io.connect('https://ionichat-fvntr.c9.io/'); 

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket
})

.controller('LoginController', function($scope, $state){
  $scope.join = function(nickname){
    if(nickname){
      $state.go('chat', {nickname: nickname}); 
    }
  }
})

.controller('ChatController', function($scope, $stateParams, Socket ){

  var data = {message: "Server check"};

  Socket.on("connect", function(){
    Socket.emit("Message", data);
  });

  Socket.on("Message", function(){
    alert(data.message);
  });

  $scope.nickname = $stateParams.nickname;

})