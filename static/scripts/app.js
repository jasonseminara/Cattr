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
      .state( 'tags', {
        url:'/tags/:tag',
        template: function(){
          console.log(arguments)
          return "<p>this is tags</p>"
        }
      })
      .state( 'order', {
        url:'/order/:catID/:availID',
        
        template: function(){
          console.log(arguments)
          return "<p>this is a thins</p>"
        }
      })
      .state( 'archive',{
        url:'/archive',
        templateUrl:'archive.html'
      });
  }])
  ;
