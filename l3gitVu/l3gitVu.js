if (Meteor.isClient) {
    var l3gitVuModule = angular.module('l3gitVu', [
        'angular-meteor',
        'ui.router'
    ]);


    /*
     *******************
     *** CONTROLLERS ***
     *******************
     */

    //Main Controller
    l3gitVuModule.controller('MainController', function($scope, l3gitGetter, $log){
        $scope.data = {};
        $scope.updateQuery = function(){
            l3gitGetter.setQuery($scope.data.query);
        };

        $scope.submitQuery = function() {
            l3gitGetter.callAPI()
                .then(function successCallBack(data){
                    $scope.data.searchData = data;
                    $log.log(data);
                }, function errorCallBack(data){
                    $log.log("Error: L3gitVuModule > Main Controller > submitQuery > callAPI");
                    $log.log(data);
                })
        };
    });
    //END Main Controller

    //Header Controller
    l3gitVuModule.controller('HeaderCtrl', function ($scope) {
        $scope.infoModal = function () {

            bootbox.dialog({
                message: "Welcome to the M3teorVu Proof of Concept!",
                title: "M3teorVu v0.01"
            });
        };
    });
    //END Header Controller




    /*
     *******************
     **** FACTORIES ****
     *******************
     */

    //l3gitGetter
    l3gitVuModule.factory('l3gitGetter', function($http, $q) {
        var service = {};
        var baseUrl = 'https://itunes.apple.com/search?term=';
        var _query = '';
        var _finalUrl = '';
        var error = 'There was an error requesting the JSONP data from the API :(';

        var makeUrl = function(){
            _query = _query.split(' ').join('+');
            _finalUrl = baseUrl + _query + '&callback=JSON_CALLBACK';
            return _finalUrl
        };

        service.setQuery = function(query){
            _query = query;
        };

        service.getQuery = function(){
            return _query;
        };

        service.callAPI = function(){
            makeUrl();
            var deferred = $q.defer();
            $http({
                method: 'JSONP',
                url: _finalUrl
            }).then(function successCallback(data) {
                deferred.resolve(data);
            }, function errorCallback() {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        return service;
    });
    //END l3gitGetter


    /*
     *******************
     **** DIRECTIVES ****
     *******************
     */

    //AcctList
//    l3gitVuModule.directive('acctList', function() {
//        return {
//
//        }
//    });
    //END AcctList


    /*
     *******************
     **** ROUTES ****
     *******************
     */

    //Route Configuration
//    l3gitVuModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
//        $locationProvider.html5Mode(true);
//
//        $stateProvider
//            .state('', {
//                url: '/',
//                template: '<></>'
//            })
//            .state('', {
//                url: '/',
//                template: '<></>'
//            });
//
//        $urlRouterProvider.otherwise("/");
//    });
    //END Route Configuration

}