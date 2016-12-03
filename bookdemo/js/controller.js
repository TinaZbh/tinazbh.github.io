/**
 * Created by zbh on 2016/12/3.
 */
var bookDemoCtrls = angular.module('bookDemoCtrls', []);
bookDemoCtrls.controller('helloCtrl', function ($scope) {
    $scope.greeting = {
        text: 'hello'
    };
    $scope.pageClass = 'hello';
});
bookDemoCtrls.controller('formCtrl', function ($scope) {
    $scope.userInfo =
    {
        email: 'bihan.zhang@foxmail.com',
        password: '111111',
        autoLogin: true
    }
    $scope.pageClass='form';
    $scope.getEmail = function () {
        console.log($scope.userInfo);
    }
    $scope.setEmail = function () {
        $scope.userInfo =
        {
            email: 'guoqin.shan@foxmail.com',
            password: '222222',
            autoLogin: true
        }
    }
    $scope.resetEmail = function () {
        $scope.userInfo =
        {
            email: '',
            password: '',
            autoLogin: false
        }
    }
});