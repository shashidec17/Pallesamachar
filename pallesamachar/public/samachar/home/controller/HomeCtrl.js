app.controller('MandalController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var distMandalInfo = StorageService.getUserInfo('user_info');
   
   var perPage = 10;

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
                    "perPage":perPage
                }
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.newsList = response.data.newsList;
               
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

    $scope.viewNews = function(news){

        StorageService.setNewsInfo(news);
        $state.go("viewNews");

    }


});





app.controller('DistrictController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var distMandalInfo = StorageService.getUserInfo('user_info');

    var perPage = 10;

    var districtWise = function(){
        var pageIndex = 0;
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "get_news_by_district",
            data: {
                    "districtId":distMandalInfo.districtData.districtId,
                    "districtName":distMandalInfo.districtData.districtName,
                    "newsIndex":pageIndex,
                    "perPage":perPage
                },
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.newsList = response.data.newsList;
              
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

     $scope.viewNews = function(news){

        StorageService.setNewsInfo(news);
        $state.go("viewNews");

    }

});






app.controller('viewNewsController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var newsInfo = StorageService.getUserInfo('news_info');
    $scope.viewNews = {};
    var viewNews = function(){
       
        $scope.viewNews = newsInfo;
        console.log("view news : ",$scope.viewNews);
    }

    viewNews();

     $scope.goBack = function(){

       history.go(-1);

    }

});