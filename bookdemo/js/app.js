/**
 * Created by zbh on 2016/12/3.
 */
//启动点模块
var bookStoreApp = angular.module('bookStoreApp', ['ngRoute', 'ngAnimate', 'bookDemoCtrls']);


bookStoreApp.config(function ($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: 'html/hello.html',
        controller: 'helloCtrl'
    }).when('/form', {
        templateUrl: 'html/form.html',
        controller: 'formCtrl'
    }).otherwise({
        redirectTo: '/hello'
    })
});