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

        fac.getPositionInfo = function () {
            return fac.getObject('position_info');
        };

        fac.setPositionInfo = function (user) {
            fac.setObject('position_info', user);
        };

        fac.removePositionInfo = function () {
            fac.removeObject('position_info');
        };

        fac.getEventInfo = function () {
            return fac.getObject('Event_info');
        };

        fac.setEventInfo = function (user) {
            fac.setObject('Event_info', user);
        };

        fac.removeEventInfo = function () {
            fac.removeObject('Event_info');
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

        fac.getUpgradePlanInfo = function () {
            return fac.getObject('upgrade_info');
        };

        fac.setUpgradePlanInfo = function (upgradePlan) {
            fac.setObject('upgrade_info', upgradePlan);
        };

        fac.getCurrentPlanInfo = function () {
            return fac.getObject('current_plan_info');
        };

        fac.setCurrentPlanInfo = function (currentPlan) {
            fac.setObject('current_plan_info', currentPlan);
        };


        

        return fac;
    }
]);