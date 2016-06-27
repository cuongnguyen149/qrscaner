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
              $rootScope.scanResult = result.text;
              $rootScope.timeScan   = result.TIME;
              $state.go('workpass');
            }    
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
});

app.controller("workpassCtr", function($rootScope, $scope, $cordovaBarcodeScanner, $state) {
  $scope.nextScan = function() {
    // console.log('click');
    $cordovaBarcodeScanner.scan().then(function(result) {
       if(!result.cancelled)
        {
          $scope.scanResult       = result.text;
          $scope.timeScanBefore   = result.TIME;
          $state.go('workpass');
        }  
    }, function(error) {
        console.log("An error happened -> " + error);
    });
  }; 
  var now           = Date.now();
  $scope.scanResult = $rootScope.scanResult;
  if($scope.timeScanBefore ){
    $scope.timeScan   = ((now - $scope.timeScanBefore)/1000).toFixed(3);
  }else{
    $scope.timeScan   = ((now - $rootScope.timeScan)/1000).toFixed(3);
  }
  $scope.exit       = function() {
    navigator.app.exitApp();
  };
});