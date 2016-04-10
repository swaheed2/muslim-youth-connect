'use strict'


myControllers.controller('EventDetailCtrl', function($scope,$stateParams,AuthService,$firebaseAuth) {

	$scope.settings = {
		going: false
	}; 
	var refString;
	var ref;
	var userProfile;

	$scope.attendees = [
		"Sumama Waheed",
		"Fazeel Tola",
		"Bilal Khan",
		"Abdur Rahman",
		"Bilal Malil"
	]


	$scope.getAttendance = function() {
		refString = "https://muslimyouthconnect.firebaseio.com/"; 
		ref = new Firebase(refString); 
		console.log("getting attendance");
		userProfile = AuthService.getUserProfile();
		for(var i=0; i< $scope.attendees.length;i++){
			if($scope.attendees[i] === userProfile.firstName + " " + userProfile.lastName){
				$scope.settings.going = true;
			}
		}
	}
	$scope.getAttendance();

	$scope.updateAttendance = function(){
		var going = $scope.settings.going;

		if(going){
			$scope.attendees.push(userProfile.firstName + " " + userProfile.lastName)
		} 
		else{
			for(var i=0; i< $scope.attendees.length;i++){
				if($scope.attendees[i] === userProfile.firstName + " " + userProfile.lastName){
					$scope.attendees.splice(i,1);
				}
			}
		}
	}



	$scope.safeApply = function(fn) { 
		if(this.$root && (this.$root.$$phase == '$apply' || this.$root.$$phase == '$digest') ) {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		}else {
			this.$apply(fn);
		}
	}; 


});