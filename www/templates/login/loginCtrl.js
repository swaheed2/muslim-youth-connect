myControllers.controller(
	'LoginCtrl', 

	function($scope,AuthService,$state) {
 
		$scope.auth = AuthService;


		$scope.logInData = {
			email : "sumamawaheed1@gmail.com",
			password : "asdfadf"
		};


		$scope.logIn = function() { 
			console.log("login function called");
			AuthService.logIn($scope.logInData,function(err,res){
				console.log("err: " + err);
				console.log("res: " + res);
				
				if(!err){
					$state.transitionTo('tab.dash',{location:"replace"});
				}
			});

		};  



	} 
)
