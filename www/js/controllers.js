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

	$scope.users = [];

	console.log("userprofile: " + JSON.stringify(AuthService.getUserProfile(),null,2));

	if(AuthService.getUserProfile().gender === "M"){
		console.log("user is male");
		AuthService.getMaleUsers(function(users){ 
			$scope.users.push(users);
		})
	}
	else{
		console.log("user is male");
		AuthService.getFemaleUsers(function(users){ 
			$scope.users.push(users);
		})
	}


	$scope.remove = function(chat) {
		Chats.remove(chat);
	};

});



myControllers.controller('AccountCtrl', function($scope,AuthService) {
	$scope.settings = {
		enableFriends: true
	}; 

	$scope.user = AuthService.getUserProfile();
});



