app.controller('LoginController', function ($rootScope, $scope, $state,$http, WebServices, StorageService) {

    $scope.loginFormData = {};
    $scope.districtList = [];
    $scope.mandalList = [];

    $scope.init = function(){

		$rootScope.loading = true;
        WebServices.api({
            method: "GET",
            url: "get_districts",
            data: null,
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.districtList = response.data.districtList;
                console.log($scope.districtList);
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

    $scope.onChangeDistrict = function(district){
        console("selected district : ",district);
        $scope.mandalList = district.mandalsList;
    }

    
    $scope.isSubmitted = false;
    $scope.login = function (loginFrom) {
        $scope.isSubmitted = true;
        if (loginFrom.$invalid) {
            return false;
        }
        //if (loginFrom.$valid) {
        $scope.incorrectCredentials = false;
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "distMandalService/getDistricts",
            data: { "email": $scope.loginFormData.email, "password": $scope.loginFormData.password },
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.districtList = response.data.districtList;
                console.log($scope.districtList);
            }else{
                console.log("error in ");
            }

        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
        //}

    };

});