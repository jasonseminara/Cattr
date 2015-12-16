'use strict';
/**
 * @ngdoc overview
 * @name cattrApp
 * @description
 * # cattrApp
 *
 * Main module of the application.
 */
var cattr = angular.module('cattrApp', ['ui.router','satellizer','ngResource'])
  .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    //ROUTES HERE
    console.log('werwerwerwers');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state( '/', {
        url:'/',
        templateUrl: 'views/main.partial.html'
      })
      .state( 'login', {
        url:'/login',
        templateUrl: 'views/login.html'
      })
      .state( 'reserve', {
        url:'/reserve',
        templateUrl: 'views/reserve.html'
      })
      .state( 'archive',{
        url:'/archive',
        templateUrl:'archive.html'
      });
  }])
  ;
