app.controller('MandalController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var distMandalInfo = StorageService.getUserInfo('user_info');
   
    var mandalWise = function(){
        var pageIndex = 0;
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "get_news_by_mandal",
            data: {
                    "districtId":distMandalInfo.districtData.districtId,
                    "mandalId":distMandalInfo.mandalData.mandalId,
                    "mandalName":distMandalInfo.mandalData.mandalName,
                    "newsIndex":pageIndex,
                    "perPage":10
                },
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.newsList = response.data.newsList;
                console.log("newsList",$scope.newsList);
            }else{
                console.log("error in  news");
            }
            $rootScope.loading = false;
        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
    }


    mandalWise();


});





app.controller('DistrictController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var distMandalInfo = StorageService.getUserInfo('user_info');


    var districtWise = function(){
        var pageIndex = 0;
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "get_news_by_district",
            data: {
                    "districtId":distMandalInfo.districtData.districtId,
                    "districtName":distMandalInfo.districtData.districtName,
                    //"mandalsList":[distMandalInfo.mandalData],
                    "newsIndex":pageIndex,
                    "perPage":10
                },
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.newsList = response.data.newsList;
                console.log("newsList",$scope.newsList);
            }else{
                console.log("error in  news");
            }
            $rootScope.loading = false;
        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
    }

    districtWise();

});