'use strict'

var sharingApp = angular.module('sharingApp',['ui.router']);

sharingApp.filter('dobDate', [function() {
    return function(input) {
        var momentDate = moment(input);
        return input && momentDate.isValid() ? momentDate.format('MM/DD/YY') : input;
    }
}]);

sharingApp.config(function($locationProvider, $stateProvider, $rootScopeProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });


    var homeState = {
        name: 'home',
        url: '/',
        views: {
            workspaceView: {
                template: '<org-view></org-view>'
            }
        }
    };



    $stateProvider.state(homeState);



});


sharingApp.run(function($rootScope){

    console.log($rootScope.selectedUser)
});
