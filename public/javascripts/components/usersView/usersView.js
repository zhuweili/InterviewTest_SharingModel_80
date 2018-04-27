'use strict'

var sharingApp = angular.module('sharingApp');

sharingApp.component("usersView", {
    templateUrl: '/javascripts/components/usersView/usersView.html',
    controller: 'UsersViewController',
    bindings: {
        org: '<',
        selectedUser: '=selectedUser'
    }
});

sharingApp.controller('UsersViewController', ['$http', '$rootScope', '$scope',function($http, $rootScope, $scope) {

    this.allUsers = [];



    this.newUserData = {
        firstName: null,
        lastName: null,
        dob: null
    };

    var that = this;

    this.$onInit = function() {
        fetchAllUsers();
    };

    this.$onChanges = function(changeObj){
      if(changeObj.org && changeObj.org.currentValue){
          fetchAllUsers();
      }
    };

    function fetchAllUsers(){
        if(that.org){
            $http.get('/api/v1/users/' + that.org._id)
                .then(function(result) {
                    that.allUsers_org = result.data;
                    that.allUsers = that.allUsers_org;
                    that.userError = null;
                }, function(err) {
                    console.log(err);
                    that.userError = err.data;
                });
        }
    }




    $scope.$watch('$root.selectedGroup', function() {
        that.allUsers = that.allUsers_org;
        if ($rootScope.selectedGroup != null){
            function checkgroup(user) {
                return user.groupId == $rootScope.selectedGroup._id;
            }
            that.allUsers = that.allUsers_org.filter(checkgroup)
        }
    });

    this.createUser = function() {
        this.newUserData.orgId = this.org._id;
        this.newUserData.groupId = $rootScope.selectedGroup._id;
        this.newUserData.orgAdmin = false;
        this.newUserData.groupAdmin = false;
        console.log(this.newUserData);

        $http.put('/api/v1/users', this.newUserData)
            .then(function(result) {
                that.allUsers_org.push(result.data);
                that.allUsers.push(result.data);
                that.userError = null;
                $('#newUserModal').modal('hide');
            }, function(err) {
                console.log(err);
                that.userError = err.data.message || err.data.errmsg;
            });
    };

    this.showUsersDetail = function(user) {
        $rootScope.selectedUser = user;
        $('#userdetails').addClass('show');
    }





}]);