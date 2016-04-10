'use strict';

/* Controllers */

console.log("controllers.js");


var myControllers = angular.module('myControllers', []);



/*
  ============================================================
  id: Main Controller
  ============================================================
*/  

myControllers.controller('MainCtrl', function($scope,AuthService) {

	$scope.auth = AuthService;   


}); 


myControllers.controller('AuthCtrl', function($scope) { 

	$scope.$on('$viewContentLoaded', function(){

	});
});




myControllers.controller('YouthCtrl', function($scope,AuthService,Chats){

	$scope.auth = AuthService;

	if(AuthService.getUserProfile().gender === "M"){
		console.log("user is male");
		AuthService.getMaleUsers(function(users){
			$scope.users = users;
		})
	}
	
	
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};

});

myControllers.controller('ChatsCtrl', function($scope, Chats) { 


});

myControllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
});

myControllers.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});



