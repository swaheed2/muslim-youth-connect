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
		"Bilal Malil",
		"Abdul Wahab",
		"Hamza Ali",
		"Javaid Akhtar",
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
		$scope.attendees = shuffle($scope.attendees);
	}
	$scope.getAttendance();

	$scope.updateAttendance = function(){
		var going = $scope.settings.going;

		if(going){
			$scope.attendees.unshift(userProfile.firstName + " " + userProfile.lastName)
		} 
		else{
			for(var i=0; i< $scope.attendees.length;i++){
				if($scope.attendees[i] === userProfile.firstName + " " + userProfile.lastName){
					$scope.attendees.splice(i,1);
				}
			}
		}
	}


	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
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