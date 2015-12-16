'use strict';

/**
 * @ngdoc function
 * @name cattrApp.controller:ReservationcontrollerCtrl
 * @description
 * # ReservationcontrollerCtrl
 * Controller of the cattrApp
 */

cattr.controller('ReservationController', ['CatData',function(catData) {
  var self = this;
  self.all=[];

  self.getCats = function getCats(){
    catData.getAll()
      .$promise
      .then(function(res) {
        console.log(res);
      })
      .catch(function(re) {
        console.error('failure',res);
      })
  };

  self.getCats()
    
}]);
