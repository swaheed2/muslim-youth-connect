myControllers.controller(
	'EventsCtrl', 

	function($scope,AuthService,$state) {

		$scope.auth = AuthService;

		$scope.eventData = {};

		$scope.$on('$viewContentLoaded', function(event) {
			
		});


		$scope.createEvent = function(){
			$state.go("tab.createEvent");
		}


		$scope.publishEvent = function(){
			AuthService.showLoader();
			$scope.eventData.createdBy = AuthService.getUserProfile();
			$scope.eventData.masjid = AuthService.getUserProfile().masjid;
			AuthService.createEvent($scope.eventData,function(){
				AuthService.hideLoader();
				$state.go("tab.events");
			})
		}

		$scope.getAllEvents = function(){
			AuthService.showLoader(); 
			AuthService.getAllEvents(function(events){

				$scope.events = events;
				AuthService.hideLoader();
			})
		};
		$scope.getAllEvents();

	} 
)
