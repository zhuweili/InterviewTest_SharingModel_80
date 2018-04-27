'use strict'

var sharingApp = angular.module('sharingApp');

sharingApp.component("userdetailView", {
    templateUrl: '/javascripts/components/userdetailView/userdetailView.html',
    controller: 'UserDetailViewController',

});

sharingApp.controller('UserDetailViewController', ['$http', '$rootScope', '$scope',function($http, $rootScope, $scope) {

    $scope.selectedUser = $rootScope.selectedUser;

    this.newUserData = {
        firstName: null,
        lastName: null,
        dob: null
    };

    var that = this;

    console.log(that);

    this.$onInit = function() {
        console.log($rootScope.selectedUser);

    };

    $scope.$watch('$root.selectedUser', function() {
        $scope.selectedUser = $rootScope.selectedUser
    });

    $scope.ll= function(){
        console.log($rootScope)
    };

    function fetchAllUsers(){
        if(that.org){
            $http.get('/api/v1/users/' + that.org._id)
                .then(function(result) {
                    that.allUsers = result.data;
                    that.userError = null;
                }, function(err) {
                    console.log(err);
                    that.userError = err.data;
                });
        }
    }

    this.createUser = function() {
        this.newUserData.orgId = this.org._id;

        $http.put('/api/v1/users', this.newUserData)
            .then(function(result) {
                that.allUsers.push(result.data);
                that.userError = null;
                $('#newUserModal').modal('hide');
            }, function(err) {
                console.log(err);
                that.userError = err.data.message || err.data.errmsg;
            });
    };

    this.updateUser = function(orgAdmin, groupAdmin) {
        $rootScope.selectedUser.orgAdmin = orgAdmin;
        $rootScope.selectedUser.groupAdmin = groupAdmin;

        $http.patch('/api/v1/users', $rootScope.selectedUser)
            .then(function(result) {
                alert("Admin updated");
            }, function(err) {
                console.log(err);
                that.userError = err.data.message || err.data.errmsg;
            });
    };





}]);