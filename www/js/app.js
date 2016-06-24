// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('qrscanner', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller("mainCtr", function($rootScope, $scope, $cordovaBarcodeScanner, $state) {
    $scope.scanQR = function() {
        // console.log('click');
        $cordovaBarcodeScanner.scan().then(function(result) {
           if(!result.cancelled)
            {
              var now       = Date.now() / 1000 | 0;

              $rootScope.scanResult = result.text;
              $rootScope.timeScan   = now - result.TIME / 1000;
              $state.go('workpass');
            }
            
        }, function(error) {
            console.log("An error happened -> " + error);
        },{
          RESULT_DISPLAY_DURATION_MS: 0,
          SCAN_FORMATS: 'QR_CODE',
          PROMPT_MESSAGE: 'Present QR Code'
        });
    };
 
});

app.controller("workpassCtr", function($rootScope, $scope, $state, $ionicHistory, $ionicViewService) {
 $scope.scanResult = $rootScope.scanResult;
 $scope.timeScan = $rootScope.timeScan;
 // $scope.myGoBack = function() {
 
 //    // $ionicHistory.goBack();
 //    $state.go('app',{},{reload: true});
 //  };
});