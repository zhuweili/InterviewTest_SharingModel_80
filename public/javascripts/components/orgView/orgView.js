'use strict';

var sharingApp = angular.module('sharingApp');

sharingApp.component("orgView", {
    templateUrl: '/javascripts/components/orgView/orgView.html',
    controller: 'OrgViewController'
});

sharingApp.controller('OrgViewController', ['$http', '$rootScope', function($http, $rootScope) {

    this.allOrgs = [];
    this.selectedOrg;
    this.deatilVis;



    this.newOrgData = {
        name: null,
        description: null
    };
    // console.log("njkvnf");

    var that = this;

    this.$onInit = function() {
        $http.get('/api/v1/orgs')
            .then(function(result) {
                that.allOrgs = result.data;
                that.orgError = null;
            }, function(err) {
                console.log(err);
                that.orgError = err.data;
            });
    };

    this.createOrg = function() {
        $http.put('/api/v1/orgs', this.newOrgData)
            .then(function(result) {
                that.allOrgs.push(result.data);
                that.orgError = null;
                $('#newOrgModal').modal('hide');
            }, function(err) {
                console.log(err);
                that.orgError = err.data.message || err.data.errmsg;
            });
    };

    this.showUsers = function(org) {
        this.selectedOrg = org;
        $rootScope.selectedUser = null;
        $rootScope.selectedGroup = null;
        $('#details').addClass('show');
        $('#userdetails').removeClass('show');


    };





}]);