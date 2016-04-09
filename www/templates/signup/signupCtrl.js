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
			confirmPassword : "asd",
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
			if($scope.signUpData.password === $scope.signUpData.confirmPassword){
				AuthService.signUp($scope.signUpData,function(err,res){
					console.log("err: " + err);
					console.log("res: " + res);

					if(!err){
						AuthService.logIn({
							email : $scope.signUpData.email,
							password : $scope.signUpData.password
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
