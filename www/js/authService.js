angular.module("myServices").factory(
	"AuthService",

	['$firebaseAuth','$ionicLoading','$state',


	 function($firebaseAuth,$ionicLoading,$state){
		 console.log("Initialize Auth Service");		
 
		 var userData = {};
		 var refString = "https://muslimyouthconnect.firebaseio.com/"; 
		 var ref = new Firebase(refString);  
		 var Auth =  $firebaseAuth(ref); 
		 var authData = null;
		 
		 var showLoader = function(message){
			 $ionicLoading.show({
				 template: '<ion-spinner icon="ios"></ion-spinner> <br>' + message, 
			 })
		 };
		 
		 var hideLoader = function(){
			 $ionicLoading.hide();
		 };

		 var logIn = function(loginData,cb){
			 showLoader("Logging In...");
			 Auth.$authWithPassword(loginData).then(function(auth) {
				 authData = auth; 
				 cb(null,authData);
				 hideLoader();
			 }).catch(function(error) {
				 console.log(error);
				 cb(error,null)
				 hideLoader();
			 });
		 };

		 var signUp = function(signUpData,cb){
			 Auth.$createUser({email:signUpData.email,password:signUpData.password}).then(function(userData) {
				 var uid = userData.uid;
				 console.log("User created with uid: " + JSON.stringify(userData,null,2)); 
				 console.log(uid) 
				 var masjidRef = ref.child(signUpData.masjid).child(signUpData.gender).child(uid); 

				 delete signUpData["password"]; 
				 delete signUpData["confirmPassword"]; 
				 signUpData.uid = uid; 
				 masjidRef.set(signUpData);  
				 userData  = signUpData;
				 console.log("User set with uid: " + uid);  
				 cb(null,userData);
			 }).catch(function(error) { 
				 console.log(error.code);
				 switch (error.code) {
					 case "EMAIL_TAKEN":
						 console.log("The new user account cannot be created because the email is already in use."); 
						 break;
					 case "INVALID_EMAIL":
						 console.log("The specified email is not a valid email.");
						 break;
					 default:
						 console.log("Error creating user:", error);
				 }
				 cb(error,null)
			 });
		 };

		 // register callback
		 function init(){
			 Auth.$onAuth(authDataCallback); 
		 }

		 // this method is called everytime auth changes, so you can check for logged in or not
		 function authDataCallback(auth) {
			 console.log("auth changed: " + auth);

			 if(auth){
				authData = auth; 
				 console.log("User " + authData.uid + " is logged in");  
				 $state.transitionTo('tab.dash', { location:"replace" });
			 }
			 else{ 
				 //$scope.safeApply();
				 console.log("no auth data");
			 }
		 }
		 
		 function logOut(){
			 Auth.$unauth();
			 $state.transitionTo('starter',{location:"replace"})
		 }
		 
		 function getUsers(cb) {
			console.log("uid in getUserData: " + authData.uid); 
			var ref = new Firebase($scope.refString);
			console.log("gotten ref");
			ref.once("value", function(snapshot) {
				console.log("inside once");
				var teamName = snapshot.key(); 
				var teamData = snapshot.val();
				console.log("teamName: " + teamName); 
				//console.log("teamData: " + JSON.stringify(teamData,null,2)); 
				if(teamData.managers && teamData.managers[uid]){
					console.log("found in manager: " + teamName); 
					userData.type = "manager";  
					userData.teamName = teamName;
				}
				else if(teamData.treasurers && teamData.treasurers[uid]){
					userData.type = "treasurer";  
					userData.teamName = teamName;
				}
				else if(teamData.players && teamData.players[uid]){
					userData.type = "player";  
					userData.teamName = teamName;
				}
				else{
					console.log("skipping team: " + JSON.stringify(teamData,null,2));
				}

				console.log(JSON.stringify(userData,null,2));
				if(cb){
					console.log("callback getUserData about to be called");
					cb(userData);
					return;
				}

			}); 
		}

		 var auth = {

			 init		:   function() {
				 console.log("init function called");
				 return init(); 
			 },

			 logIn		: 	function(loginData,cb) {
				 return logIn(loginData,cb);
			 },

			 signUp		: 	function(signUpData,cb){
				 return signUp(signUpData,cb);
			 },
			 
			 logOut		: function() { return logOut()									},
			 
			 getAuthData	: function()	{ return authData;							}

		 };

		 return auth;


	 }]

)