angular.module('samachar.mobile.services', []);
var app = angular.module('samacharApp', ['ui.router', 'mobile-angular-ui',
  'mobile-angular-ui.gestures', 'ngCookies', 'samachar.mobile.services', 'checklist-model', 'ui.bootstrap'
]);

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
    $urlRouterProvider.otherwise('/login');

   $stateProvider.state('login', {
           url: '/login',
           templateUrl: 'samachar/login.html',
           controller: "MainController"
       });
});
app.controller('MainController', function ($rootScope, $scope, $state, WebServices, StorageService) {

    $scope.districtList = [];
    $scope.mandalList = [];
    $scope.loginFormData = {"districtData" : null,"mandalData": null};

    $scope.init = function(){

        $rootScope.loading = true;
        
        WebServices.api({
            method: "GET",
            url: "get_districts",
            data: null,
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.districtList = response.data.districtList;
                console.log("ddfh",$scope.districtList);
            }else{
                console.log("error in ");
            }
            $rootScope.loading = false;
        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
    }
    $scope.init();

     $scope.onChangeDistrict = function(){
        console.log("selected district : ",$scope.loginFormData.districtData);
        $scope.mandalList = $scope.loginFormData.districtData.mandalsList;
    }

    $scope.isSubmitted = false;
    
    $scope.login = function (loginFrom) {
        $scope.isSubmitted = true;
        if (loginFrom.$invalid) {
            return false;
        }
        StorageService.setUserInfo($scope.loginFormData);
        $scope.mandalNews();

    };

    $scope.mandalNews = function () {
        $state.go("mandalnews",{},{location:'replace'});
    };

    $scope.districtNews = function(){
        $state.go("districtnews",{},{location:'replace'});
    } 

    $scope.swiped = function (direction) {
        alert('Swiped ' + direction);
    };

    var loggedOutStates = {
        launch: "launch",
        login: "login",
        signup: "signup",
        forgot_password: "forgot_password"
    };


    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    $rootScope.alertCount = 0;

    $scope.changStateTo = function (stateName, replaceLocation) {
        if (replaceLocation) {
            $state.go(stateName, {}, { location: 'replace' });
        } else {
            $state.go(stateName);
        }
    };

    // Needed for the loading screen
    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.loading = false;
        $rootScope.currentState = $state.current.name;
        console.log("========= currentState ========= " + $rootScope.currentState);
        $rootScope.showMenu = !loggedOutStates[$rootScope.currentState];

    });

    $scope.doLogout = function () {
        var user_info = StorageService.getUserInfo();
        WebServices.api({
            method: "POST",
            url: "get_dashboard_data",
            data: {
                "token": user_info.token,
                "userType": user_info.usertype,
                "pageType": "logout"
            },
        }).then(function (response) {
            StorageService.removeUserInfo();
            $state.go("login");
        }, function (error) {
            console.log("Error in failing to logout");
        });
    }



    $scope.goBack = function () {
        history.go(-1);
    };

    $scope.onDashboardClick = function () {
        $state.go("dashboard");
    };

    $scope.goToState = function (stateName) {
        $state.go(stateName);
    };

});




app.directive('colorPicker', function () {
    return {
        restrict: 'E',
        scope: {
            selectedColor: "="
        },
        templateUrl: "samachar/color_picker.html",
        link: function (scope) {

            scope.colors = [
              [
                "rgb(217, 141, 179)", "rgb(132, 70, 101)", "rgb(164, 188, 82)", "rgb(141, 173, 217)", "rgb(60, 127, 226)", "rgb(118, 26, 72)", "rgb(101, 200, 145)"
              ],
              [
                "rgb(60, 58, 59)", "rgb(223, 185, 33)", "rgb(86, 225, 204)", "rgb(255, 95, 144)", "rgb(0, 23, 57)", "rgb(0, 44, 90)", "rgb(144, 84, 204)"
              ],
            ];

            scope.selectedColor = scope.selectedColor || scope.colors[0][0];
            scope.showColorsDiv = false;

            scope.showColors = function () {
                scope.showColorsDiv = !scope.showColorsDiv;
            };

            scope.selectColor = function (item) {
                scope.selectedColor = item;
                scope.showColorsDiv = !scope.showColorsDiv;
            };

            scope.getColor = function (item) {
                return "#" + item[0] + item[1] + item[2] + ";";
            };
        }
    };
});

app.directive('datepickerPopup', function () {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function (scope, element, attr, controller) {
            //remove the default formatter from the input directive to prevent conflict
            controller.$formatters.shift();
        }
    }
});

