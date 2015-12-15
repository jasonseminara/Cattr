'use strict';
function MainRouter(states, router) {
  //ROUTES HERE
  router.otherwise('/');
  states
    .state( '/', {
      url:'/',
      templateUrl: 'views/main.partial.html'
    })
    .state( 'login', {
      url:'/login',
      templateUrl: 'views/login.html'
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