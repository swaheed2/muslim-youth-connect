'use strict'


myControllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	
	
	$scope.user = Chats.get($stateParams.uid);
	
	
});