'use strict';
function MainRouter(states, router) {
  //ROUTES HERE
  router.otherwise('/');
  states
    .state( '/', {
      url:'/',
      templateUrl: 'views/main.partial.html'
      /*controller: ['$scope', '$location', '$anchorScroll',
          function ($scope, $location, $anchorScroll) {
            $scope.gotoAbout = function() {
              // set the location.hash to the id of
              // the element you wish to scroll to.
              $location.hash('about');

              // call $anchorScroll()
              $anchorScroll();
              //console.log(arguments);
            };
      }]*/
    })
    .state( 'login', {
      url:'/login',
      templateUrl: 'login.html'
    })
    .state( 'archive',{
      url:'/archive',
      templateUrl:'archive.html'
    });


}
/**
 * @ngdoc overview
 * @name cattrApp
 * @description
 * # cattrApp
 *
 * Main module of the application.
 */
var cattrApp = angular.module('cattrApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',MainRouter]);

console.log('loaded',cattrApp);