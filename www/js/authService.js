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
		 var userProfile = null; 

		 var showLoader = function(){
			 $ionicLoading.show({
				 template: '<ion-spinner icon="ios"></ion-spinner> <br>Loading...', 
			 })
		 };

		 var hideLoader = function(){
			 $ionicLoading.hide();
		 };

		 var logIn = function(loginData,cb){

			 Auth.$authWithPassword(loginData).then(function(auth) {
				 authData = auth;   
				 cb(null,authData);

			 }).catch(function(error) {
				 console.log(error);
				 cb(error,null)

			 });
		 };

		 var signUp = function(signUpData,cb){
			 Auth.$createUser({email:signUpData.email,password:signUpData.password}).then(function(userData) {
				 var uid = userData.uid;
				 console.log("User created with uid: " + JSON.stringify(userData,null,2)); 
				 console.log(uid) 
				 var masjidRef = ref.child("users").child(uid);

				 //ref.child(signUpData.masjid).child(signUpData.gender).child(uid); 

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
				 if(userProfile === null){
					 setUserProfile(function(){
						 $state.transitionTo('tab.dash', { location:"replace" });
					 })
				 } 
			 }
			 else{ 
				 //$scope.safeApply();
				 console.log("no auth data");
			 }
		 }

		 function logOut(){
			 Auth.$unauth();
			 userProfile = null;
			 $state.transitionTo('starter',{location:"replace"})
		 }

		 function setUserProfile(cb) {

			 var users = ref.child("users");

			 console.log("uid in getUserData: " + authData.uid);   
			 users.once("value", function(snapshot) {
				 var key = snapshot.key(); 
				 var val = snapshot.val();
				 // console.log("val: " + JSON.stringify(val,null,2)); 

				 userProfile = val[authData.uid];

				 console.log("UserProfile: " + JSON.stringify(userProfile,null,2));

				 if(cb) cb();
			 });  

		 };

		 function getMaleUsers(cb) {
			 var users = ref.child("users");
			 users.orderByChild("gender").equalTo("M").on("child_added", function(snapshot) {
				 var key = snapshot.key(); 
				 var val = snapshot.val();
				 //console.log("val: " + JSON.stringify(val,null,2)); 
				 cb(val);
			 });
		 }

		 function getFemaleUsers(cb) {
			 var users = ref.child("users");
			 users.orderByChild("gender").equalTo("F").on("child_added", function(snapshot) {
				 var key = snapshot.key(); 
				 var val = snapshot.val();
				 console.log("val: " + JSON.stringify(val,null,2)); 
				 cb(val);
			 });
		 }

		 function getProfile(uid,cb){

			 console.log("getProfile uid: " + uid);

			 var users = ref.child("users");

			 console.log("uid in getUserData: " + authData.uid);   
			 users.once("value", function(snapshot) { 
				 var val = snapshot.val();   
				 cb(val[uid]);
			 });  
		 };

		 function createEvent(eventData,cb){
			 var eventRef = ref.child("events");   
			 eventRef.push(eventData);   
			 cb();
		 };

		 function getAllEvents(cb){
			 var users = ref.child("events");
			 users.on("value", function(snapshot) {
				 var key = snapshot.key(); 
				 var val = snapshot.val();
				 console.log("val: " + JSON.stringify(val,null,2)); 
				 cb(val);
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

			 logOut		: function() { return logOut();									}, 
			 getAuthData	: function()	{ return authData;							}, 
			 setUserProfile : function(cb)  { setUserProfile(cb);						},
			 getUserProfile : function() 	{ return userProfile;						},
			 getMaleUsers   : function(cb)  { getMaleUsers(cb);							},
			 getFemaleUsers   : function(cb)  { getFemaleUsers(cb);						},
			 showLoader	    : function()    { showLoader();								}, 
			 hideLoader	    : function()    { hideLoader();								},
			 getProfile		: function(uid,cb)  { return getProfile(uid,cb)			    },
			 createEvent    : function(data,cb) {  return createEvent(data,cb);			},
			 getAllEvents   : function(cb)	{ return getAllEvents(cb);					}


		 };

		 return auth;


	 }]

)