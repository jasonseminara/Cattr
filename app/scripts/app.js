'use strict';
/**
 * @ngdoc overview
 * @name cattrApp
 * @description
 * # cattrApp
 *
 * Main module of the application.
 */
var cattr=angular.module('cattrApp', ['ui.router','satellizer'])
  .config(['$stateProvider', '$urlRouterProvider',function (states, router) {
    //ROUTES HERE
    console.log('werwerwerwers');
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
  }])
  ;
var nullify = function(){};
nullify(cattr);