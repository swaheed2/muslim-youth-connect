myControllers.controller(
	'SignupCtrl', 

	function($scope,AuthService,$state,$ionicPopup) {

		console.log("SignupCtrl") 
		$scope.auth = AuthService;



		$scope.signUpData = {
        };


		$scope.signUp = function() {
			AuthService.showLoader();
			var signUpData = (JSON.parse(JSON.stringify($scope.signUpData)));
			if($scope.signUpData.password === $scope.signUpData.confirmPassword){
				AuthService.signUp($scope.signUpData,function(err,res){
					console.log("err: " + err);
					console.log("res: " + res);

					if(!err){
						console.log("signUpData: " + JSON.stringify(signUpData,null,2));
						AuthService.logIn({
							email : signUpData.email,
							password : signUpData.password
						},function(err,res){
							if(!err){
								$state.transitionTo('tab.dash',{location:"replace"});
								AuthService.hideLoader();
							}
							else{
								AuthService.hideLoader();
							}

						}); 
					}
					else{
						AuthService.hideLoader();
					}
					
				});
			}
			else {
				console.log("passwords do not match");

				$ionicPopup.alert({
					title: 'Error',
					template: 'Passwords do not match'
				})(); 

			}

		}; 




	} 
)
