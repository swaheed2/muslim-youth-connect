myControllers.controller(
	'SignupCtrl', 

	function($scope,AuthService,$state) {

		console.log("SignupCtrl") 
		$scope.auth = AuthService;


		$scope.signUpData = {
			firstName : "male1",
			lastName  : "male1",
			age		  : 10,
			email     : "male1@gmail.com",
			password  : "asdf",
			masjid    : "IACC",
			gender    : "M",
			interests : {
				basketball : true,
				soccer	   : true,
				football   : false,
				badminton  : false
			},
			hafidh	  : true
			
		};


		$scope.signUp = function() { 
			AuthService.signUp($scope.signUpData,function(err,res){
				console.log("err: " + err);
				console.log("res: " + res);
				
				if(!err){
					$state.transitionTo('tab.dash',{location:"replace"});
				}
			});

		}; 




	} 
)
