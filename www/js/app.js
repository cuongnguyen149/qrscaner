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

app.controller("mainCtr", function($rootScope, $scope, $cordovaBarcodeScanner, $state, $window ) {
    $scope.scanQR = function() {
      $rootScope.startTime = Date.now();
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

app.controller("workpassCtr", function($rootScope, $scope, $cordovaBarcodeScanner, $state, $window ) {
  $rootScope.$watch('[timeScan, timeFocus]', function() {
    console.log('hey, timeScan has changed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    var now           = Date.now();
    $scope.scanResult = $rootScope.scanResult;
    $scope.timeScan   = now -  $rootScope.timeScan;
    $scope.timeFocus  = $rootScope.timeScan - $rootScope.startTime;
    var data = [{
      value: $scope.timeScan,
      color: "#35a4e2"
    }, {
      value: $scope.timeFocus,
      color: "#e77200"
    }];
     setTimeout(function() {
       var DoughnutTextInsideChart = new Chart(angular.element(document.querySelector("#radar"))[0].getContext('2d')).DoughnutTextInside(data, {
         responsive: true,
         percentageInnerCutout : 70,
         animationSteps: 40
       });
     }, 500);
  });
  var now           = Date.now();
  $scope.scanResult = $rootScope.scanResult;
  $scope.timeScan   = now -  $rootScope.timeScan;
  $scope.timeFocus  = $rootScope.timeScan - $rootScope.startTime;
  Chart.types.Doughnut.extend({
    name: "DoughnutTextInside",
    draw: function() {
        Chart.types.Doughnut.prototype.draw.apply(this, arguments);
        var width = this.chart.width,
            height = this.chart.height;

        var fontSize = (height / 114).toFixed(2);
        this.chart.ctx.font = fontSize + "em Verdana";
        this.chart.ctx.textBaseline = "middle";
        this.chart.ctx.fillStyle = "#ffffff";

        var text = $scope.timeScan + $scope.timeFocus + "ms",
            textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
            textY = height / 2;
        this.chart.ctx.fillText(text, textX, textY);
    }
  });

  var data = [{
      value: $scope.timeScan,
      color: "#35a4e2"
  }, {
      value: $scope.timeFocus,
      color: "#e77200"
  }];
  setTimeout(function() {
    var DoughnutTextInsideChart = new Chart(angular.element(document.querySelector("#radar"))[0].getContext('2d')).DoughnutTextInside(data, {
      responsive: true,
      percentageInnerCutout : 70,
      animationSteps: 40
    });
  }, 500);

  $scope.nextScan = function() {
//    $window.localStorage.startTime = Date.now();
    $rootScope.startTime = Date.now();
    $cordovaBarcodeScanner.scan().then(function(result) {
       if(!result.cancelled)
        {
          $rootScope.scanResult = result.text;
          $rootScope.timeScan   = result.TIME;
          $window.close();
        }
    }, function(error) {
        console.log("An error happened -> " + error);
    });
  };
  // $scope.exit       = function() {
  //   navigator.app.exitApp();
  // };
});
