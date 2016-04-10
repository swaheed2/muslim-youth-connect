myControllers.controller(
	'SignupCtrl', 

	function($scope,AuthService,$state,$ionicPopup) {

		console.log("SignupCtrl") 
		$scope.auth = AuthService;



		$scope.signUpData = {
			firstName : "male1",
			lastName  : "male1",
			age		  : 10,
			email     : "male1@gmail.com",
			password  : "asdf",
			confirmPassword : "asdf",
			masjid    : "IACC",
			gender    : "M",
			interests : {
				basketball : true,
				soccer	   : true,
				football   : false,
				badminton  : false
			},
			hafidh	  : true,
			edu		  : "UTD"

		};


		$scope.signUp = function() {
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
							}

						}); 
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
