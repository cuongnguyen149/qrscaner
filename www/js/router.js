angular.module('qrscanner').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('app', {
      url: '/',
      templateUrl: './views/main.html',
      controller: "mainCtr"
    })
    .state('workpass', {
      url: '/workpass',
      templateUrl: './views/workpass.html',
      controller: "workpassCtr"
    })

    $urlRouterProvider.otherwise("/");
});      