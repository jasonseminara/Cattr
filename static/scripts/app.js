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
          return "<p>this is a thing</p>"
        }
      })
      .state( 'archive',{
        url:'/archive',
        templateUrl:'archive.html'
      })


      /* /CATS/(list|new) */
      .state( 'cats', {
        abstract: true,
        url:'/cats',
        template: '<ui-view/>'
      })
      .state( 'cats.list', {
        url:'/list',
        templateUrl: 'views/reserve.html',
        controller: 'ReservationController as rsvp'
      })
      .state( 'cats.new', {
        url:'/new',
        templateUrl: 'views/cat.new.html',
        controller: 'CatController as newCat'
      })

  }])
  ;
