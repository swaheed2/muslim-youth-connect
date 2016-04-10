
var myApp = angular.module('starter', ['ionic', 'myControllers', 'myServices','firebase'])

.run(function($rootScope,$ionicPlatform,AuthService,$state) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

	$rootScope.$on('$stateChangeStart', 
				   function(event, toState, toParams, fromState, fromParams, options){ 

		console.log("$stateChangeStart");
		console.log("toState: " + toState.name);
		console.log("authData: " + AuthService.getAuthData());

		if(toState.name !== 'starter' &&  toState.name !== 'signup' && toState.name !== 'login' && AuthService.getAuthData() === null)  {
			console.log("no auth data");
			event.preventDefault(); 
			if(toState.name === 'signup'){
				$state.go('signup');
			}
			else if(toState.name === 'login'){
				$state.go('login');
			}
			else {
				$state.go('starter');
			} 
		} 
	})
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider


	// setup an abstract state for the tabs directive
		.state('starter', {
		url: '/starter', 
		templateUrl: 'templates/starter/starter.html',
		controller : 'MainCtrl'
	})

	// signup state
		.state('signup', {
		url: '/signup', 
		templateUrl: 'templates/signup/signup.html',
		controller : 'SignupCtrl'
	})
	
	// signup state
		.state('login', {
		url: '/login', 
		templateUrl: 'templates/login/login.html',
		controller : 'LoginCtrl'
	})

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

		.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'YouthCtrl'
			}
		}
	})

		.state('tab.chats', {
		url: '/chats',
		views: {
			'tab-chats': {
				templateUrl: 'templates/tab-chats.html',
				controller: 'ChatsCtrl'
			}
		}
	})
		.state('tab.chat-detail', {
		url: '/chats/:chatId',
		views: {
			'tab-chats': {
				templateUrl: 'templates/chat-detail.html',
				controller: 'ChatDetailCtrl'
			}
		}
	})

		.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});
