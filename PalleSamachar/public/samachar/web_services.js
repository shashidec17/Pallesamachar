'use strict';
angular.module('samachar.mobile.services').factory('WebServices', function ($http) {

      var _services = {};
      
      var _getUrl = function(url){
      
      	  var host = "http://localhost:1111/app";
          //var host = "https://samachar.com";
    	   var urls = {
            get_districts: "psnews/rest/distMandalService/getDistricts",
			      get_news_by_district: "psnews/rest/NewsService/getNewsByDist",
            get_news_by_mandal: "psnews/rest/NewsService/getNewsByMandal"
    	  };
    	  
    	  return host + "/" +urls[url];
      };

      _services.api = function (request) {
        
    	  request.url = _getUrl(request.url);
    	  if(request.params){
    		  request.url += "?" + CLUtil.encodeParamsForSOA(request.params);
    	  }
    	  request.headers  = {"Content-Type": "application/json"};
    	  console.log(request.url);
    	  return $http({
              method: request.method,
              url: request.url,
              data: request.data,
              headers: request.headers
            }).then(function (response) {
            	console.log(response);
              return response;
            });
      };

      return _services;
    });