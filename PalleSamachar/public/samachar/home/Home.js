app.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider.state('mandalnews', {
           url: '/mandalnews',
           templateUrl: 'samachar/home/template/mandalnews.html',
           controller: "MandalController"
       }).state('districtnews', {
           url: '/districtnews',
           templateUrl: 'samachar/home/template/districtnews.html',
           controller: "DistrictController"
       });
});