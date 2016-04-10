'use strict'


myControllers.controller('UserDetailCtrl', function($scope,$stateParams,AuthService) {

	$scope.user = {};
    

	AuthService.getProfile($stateParams.uid,function(profile){
		console.log("profile: " + JSON.stringify(profile,null,2));
		$scope.user = profile;
		$scope.safeApply();
	});

	$scope.safeApply = function(fn) { 
		if(this.$root && (this.$root.$$phase == '$apply' || this.$root.$$phase == '$digest') ) {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		}else {
			this.$apply(fn);
		}
	}; 
    
    $scope.filterSecId = function(items) {
    var result = {};
    angular.forEach(items, function(value, key) {
        if (value) {
            result[key] = value;
        }
    });
    return result;
}
    
    

});