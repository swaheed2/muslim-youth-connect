'use strict'


myControllers.controller('EventDetailCtrl', function($scope,$stateParams,AuthService,$firebaseAuth) {

	$scope.settings = {
		going: true
	}; 
	var refString;
	var ref;
	var userProfile;


	$scope.getAttendance = function() {
		refString = "https://muslimyouthconnect.firebaseio.com/"; 
		ref = new Firebase(refString); 
		console.log("getting attendance");
		userProfile = AuthService.getUserProfile();
	}
	$scope.getAttendance();

	$scope.updateAttendance = function(){

		var going = $scope.settings.going;
		var id = $stateParams.id;
		if(going){
			var events = ref.child("events");
			console.log("$stateParams.id: " + going);
			events.on("value", function(snapshot) { 
				console.log("events on : " + going);
				var val = snapshot.val(); 
				var eventRef = ref.child("events").child(id).child("attendance");  
				var uid = userProfile.uid;  
				console.log("val: " + JSON.stringify(val,null,2)); 
				eventRef.push(uid);  
			});
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