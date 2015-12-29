'use strict';
/**
* @author Jason Seminara
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
        templateUrl: 'views/tags.list.html',
        controller: 'CatController as cat'
      })

      .state( 'order', {
        url:'/order/:catID/:availID',
        templateUrl: 'views/order.html'
      })
      
      .state( 'archive',{
        url:'/archive',
        templateUrl:'archive.html'
      })

      /* /USER/(list) */
      .state('user',{
        abstract: true,
        url:'/user',
        template: '<ui-view/>'
        
      })
      .state('user.new',{
        url:'/new',
        templateUrl: 'views/user.new.html',
        controller: 'NewUserController as userForm'
      })
      .state('user.list',{
        url:'/me',
        templateUrl: 'views/user.list.html',
        controller: 'UserViewController as vm',

      })



      /* /CATS/(list|new) */
      .state( 'cats', {
        abstract: true,
        url:'/cats',
        template: '<ui-view/>'
      })
      .state( 'cats.list', {
        url:'/list',
        templateUrl: 'views/cat.list.html',
        controller: 'ReservationController as rsvp'
        
      })
      .state( 'cats.new', {
        url:'/new',
        templateUrl: 'views/cat.edit.html',
        controller: 'CatController as cat',
        data:{
          title:"Create a new Cat"
        }
      })
      .state( 'cats.edit', {
        url:'/:id/edit',
        templateUrl: 'views/cat.edit.html',
        controller: 'CatController as cat',
        data:{
          title:"Edit a Cat"
        }
      })
      .state( 'cats.detail', {
        url:'/:id',
        templateUrl: 'views/cat.one.html',
        controller: 'CatController as cat',
        data:{
          title:"Edit a Cat"
        }
      })


  }])

.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }])
.filter('openAvailability',function(){
  return function(input){
    return (input||[])
      .filter(x=>!Number.isInteger(x.host_id))
  }
})
.filter('reserved',function(){
  return function(input){
    return (input||[]) 
      .filter( x=>Number.isInteger(x.host_id) ) 
  }
})

;
