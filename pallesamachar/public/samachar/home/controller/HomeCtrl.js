app.controller('MandalController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService, $timeout) {

    var distMandalInfo = StorageService.getUserInfo('user_info');
    $scope.mandalName = distMandalInfo.mandalData.mandalName;
   var perPage = 10;
   $scope.currentPage = 0;
   $scope.newsList = [];
   $scope.totalNews = 0;

   var fetchNews = function(currentPage){
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "get_news_by_mandal",
            data: {
                    "districtId":distMandalInfo.districtData.districtId,
                    "mandalId":distMandalInfo.mandalData.mandalId,
                    "mandalName":distMandalInfo.mandalData.mandalName,
                    "newsIndex":currentPage,
                    "perPage":perPage
                }
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.totalNews = response.data.totalNews;
                angular.forEach(response.data.newsList, function(value, index){
                    $scope.newsList.push(value);
                });
                
            }else{
                console.log("error in  news");
            }
            $rootScope.loading = false;
        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
   };
   
   $scope.nextPage = function(){
        if($scope.newsList.length < $scope.totalNews){
            fetchNews(++$scope.currentPage);
        }
   };

   fetchNews(0);

    $scope.viewNews = function(news){
        StorageService.setNewsInfo(news);
        $state.go("viewNews");
    }
});





app.controller('DistrictController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var distMandalInfo = StorageService.getUserInfo('user_info');
    $scope.districtName = distMandalInfo.districtData.districtName;

    var perPage = 10;
    $scope.currentPage = 0;
   $scope.newsList = [];
   $scope.totalNews = 0;

   var fetchNews = function(currentPage){
        $rootScope.loading = true;
        $rootScope.loading = true;
        WebServices.api({
            method: "POST",
            url: "get_news_by_district",
            data: {
                    "districtId":distMandalInfo.districtData.districtId,
                    "districtName":distMandalInfo.districtData.districtName,
                    "newsIndex":currentPage,
                    "perPage":perPage
                },
        }).then(function (response) {
            if(response.data.statusCode == 200){
                $scope.totalNews = response.data.totalNews;
                angular.forEach(response.data.newsList, function(value, index){
                    $scope.newsList.push(value);
                });
              
            }else{
                console.log("error in  news");
            }
            $rootScope.loading = false;
        }, function (error) {
            $scope.incorrectCredentials = true;
            $rootScope.loading = false;
        });
       
   };

   $scope.nextPage = function(){
        if($scope.newsList.length < $scope.totalNews){
            fetchNews(++$scope.currentPage);
        }
   };

   fetchNews(0);

     $scope.viewNews = function(news){

        StorageService.setNewsInfo(news);
        $state.go("viewNews");

    }

});






app.controller('viewNewsController', function ($rootScope, $scope, $state,$stateParams, WebServices, StorageService) {

    var newsInfo = StorageService.getNewsInfo('news_info');
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