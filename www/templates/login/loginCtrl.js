myControllers.controller(
	'LoginCtrl', 

	function($scope,AuthService,$state) {
 
		$scope.auth = AuthService;


		$scope.logInData = {
			email : "male2@gmail.com",
			password : "asdf"
		};


		$scope.logIn = function() { 
			AuthService.showLoader();
			console.log("login function called");
			AuthService.logIn($scope.logInData,function(err,res){
				console.log("err: " + err);
				console.log("res: " + res);
				
				if(!err){
					AuthService.setUserProfile(function(){
						$state.transitionTo('tab.dash',{location:"replace"});
						AuthService.hideLoader();
					}) 
				}
				else{
					AuthService.hideLoader();
				}
			}); 
		};  



	} 
)
