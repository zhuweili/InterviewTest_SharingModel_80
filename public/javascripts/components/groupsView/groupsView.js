'use strict';

var sharingApp = angular.module('sharingApp');

sharingApp.component("groupsView", {
    templateUrl: '/javascripts/components/groupsView/groupsView.html',
    controller: 'GroupsViewController',
    bindings: {
        org: '<'
    }
});

sharingApp.controller('GroupsViewController', ['$http', '$rootScope', function($http, $rootScope){

    this.allGroups = [];

    this.newGroupData = {
        name: null
    };

    var that = this;

    this.$onInit = function() {
        fetchAllGroups();
    };

    this.$onChanges = function(changeObj){
        if(changeObj.org && changeObj.org.currentValue){
            fetchAllGroups();
        }
    };

    function fetchAllGroups(){
        if(that.org){
            $http.get('/api/v1/groups/' + that.org._id)
                .then(function(result) {
                    that.allGroups = result.data;
                    that.groupError = null;
                }, function(err) {
                    console.log(err);
                    that.groupError = err.data;
                });
        }
    }

    this.createGroup = function() {
        this.newGroupData.orgId = this.org._id;

        $http.put('/api/v1/groups', this.newGroupData)
            .then(function(result) {
                that.allGroups.push(result.data);
                that.groupError = null;
                $('#newGroupModal').modal('hide');
            }, function(err) {
                console.log(err);
                that.groupError = err.data.message || err.data.errmsg;
            });
    };


    this.showGroup = function(group) {
        $rootScope.selectedUser = null;
        $rootScope.selectedGroup = group;
        // $('#details').addClass('show');
        $('#userdetails').removeClass('show');


    };

}]);