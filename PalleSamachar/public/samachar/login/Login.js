app.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider.state('login', {
           url: '/login',
           templateUrl: 'samachar/login.html',
           controller: "LoginController"
       });
});