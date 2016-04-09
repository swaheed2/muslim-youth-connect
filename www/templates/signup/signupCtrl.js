myControllers.controller(
	'SignupCtrl', 

	function($scope,AuthService) {

		console.log("SignupCtrl") 
		$scope.auth = AuthService;


		$scope.signUpData = {};


		$scope.logIn = function() { 
			AuthService.logIn($scope.logInData,function(err,res){
				console.log("err: " + err);
				console.log("res: " + res);
			});

		}; 
 



	} 
)
