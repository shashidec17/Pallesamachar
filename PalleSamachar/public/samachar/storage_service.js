'use strict';

angular.module('samachar.mobile.services').factory('StorageService', ['$window', '$cookies',
    function($window, $cookies) {
		var fac = {};

        fac.getUserInfo = function(){
            return fac.getObject('user_info');
        };

        fac.setUserInfo = function(user){
            fac.setObject('user_info', user);
        };

        fac.removeUserInfo = function(){
            fac.removeObject('user_info');
        };

         fac.getNewsInfo = function(){
            return fac.getObject('news_info');
        };

        fac.setNewsInfo = function(news){
            fac.setObject('news_info', news);
        };
		
		fac.getObject =  function (key) {
            if($window.localStorage[key]){
                return JSON.parse($window.localStorage[key]);
            }
            return null;
        };
        
        fac.setObject = function (key, value) {
            if (value) {
                $window.localStorage[key] = JSON.stringify(value);
            }
        };

        fac.removeObject = function(key) {
            delete $window.localStorage[key];
        };
        

        return fac;
    }
]);