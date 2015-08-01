// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })

  $urlRouterProvider.otherwise("/event/home");
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      alert("Notification received:\n" + JSON.stringify(jsonData));
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));

      // firing an event downwards
      $rootScope.$broadcast('pushEvent', jsonData);
    };

    // Update with your OneSignal AppId and googleProjectNumber before running.
    window.plugins.OneSignal.init("fb965b9c-e77a-11e4-a9ea-97388ec7efa9",
                                   {googleProjectNumber: "455582282730"},
                                   notificationOpenedCallback);
  });
})



.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, $rootScope) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  var myListener = $rootScope.$on('child', function (event, data) {
      var alertPopup = $ionicPopup.alert({
       title: 'titulli',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
  });
})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;

  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];

  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };

})

.controller('AttendeesCtrl', function($scope) {

  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };

});
