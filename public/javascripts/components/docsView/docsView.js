'use strict';

var sharingApp = angular.module('sharingApp');

sharingApp.component("docsView", {
    templateUrl: '/javascripts/components/docsView/docsView.html',
    controller: 'DocsViewController',
    bindings: {
        org: '<'
    }
});

sharingApp.controller('DocsViewController', ['$http', '$rootScope', '$scope',function($http, $rootScope, $scope){

    this.allDocs = [];

    this.newDocData = {
        name: null
    };

    this.viewDocData = {

    };

    var that = this;




    function fetchAllDocs()
    {
        $http.get('/api/v1/docs/' + $rootScope.selectedUser._id)
            .then(function (result) {
                that.allDocs = result.data;
                that.docError = null;
            }, function (err) {
                console.log(err);
                that.docError = err.data;
            });
    }


    $scope.$watch('$root.selectedUser', function() {
        $scope.selectedUser = $rootScope.selectedUser;
        that.allDocs = [];

        if ($rootScope.selectedUser != null) {
            fetchAllDocs()
        }

    });

    this.createDoc = function() {
        this.newDocData.orgId = this.org._id;
        this.newDocData.userId = $rootScope.selectedUser._id;
        this.newDocData.groupId = $rootScope.selectedUser.groupId;
        this.newDocData.group_shared = false;
        console.log(this.newDocData);
        $http.put('/api/v1/docs', this.newDocData)
            .then(function(result) {
                that.allDocs.push(result.data);
                that.docError = null;
                $('#newDocModal').modal('hide');
            }, function(err) {
                console.log(err);
                that.docError = err.data.message || err.data.errmsg;
            });
    };

    this.shareDoc = function(doc) {

        this.shareDocData = doc;
        this.shareDocData.group_shared = true;
        console.log(this.shareDocData);
        $http.put('/api/v1/groupshare', this.shareDocData)
            .then(function(result) {
                console.log(result);
                alert("The doc is shared with your group.")
            }, function(err) {
                console.log(err);
            });
    };

    this.deleteDoc = function(doc) {

        this.deleteDocData = doc;
        this.deleteDocData.userId = $rootScope.selectedUser.userId;
        this.deleteDocData.orgAdmin = $rootScope.selectedUser.orgAdmin
        this.deleteDocData.groupAdmin = $rootScope.selectedUser.groupAdmin
        $http.put('/api/v1/docs/delete', this.deleteDocData)
            .then(function(result) {
                console.log(result);
                fetchAllDocs()
            }, function(err) {
                console.log(err);
            });
    };

    this.viewDoc = function(doc) {
        this.viewDocData = doc
    }


    
}]);