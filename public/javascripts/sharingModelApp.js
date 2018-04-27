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

    // var userState = {
    //     name: 'user',
    //     url: '/user',
    //     views: {
    //         workspaceView: {
    //             template: '<users-view></users-view>'
    //         }
    //     }
    // };
    //
    //
    // var orgState = {
    //     name: 'org',
    //     url: '/org',
    //     views: {
    //         workspaceView: {
    //             template: '<org-view></org-view>'
    //         }
    //     }
    // };
    //
    // var groupsState = {
    //     name: 'group',
    //     url: '/group',
    //     views: {
    //         workspaceView: {
    //             template: '<groups-view></groups-view>'
    //         }
    //     }
    // };
    //
    //
    // var docState = {
    //     name: 'doc',
    //     url: '/doc',
    //     views: {
    //         workspaceView: {
    //             template: '<docs-view></docs-view>'
    //         }
    //     }
    // };



    $stateProvider.state(homeState);
    // $stateProvider.state(userState);
    // $stateProvider.state(orgState);
    // $stateProvider.state(groupsState);
    // $stateProvider.state(docState);




});


sharingApp.run(function($rootScope){

    console.log($rootScope.selectedUser)
});
