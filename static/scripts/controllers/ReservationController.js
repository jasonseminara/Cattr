'use strict';

/**
 * @ngdoc function
 * @name cattrApp.controller:ReservationcontrollerCtrl
 * @description
 * # ReservationcontrollerCtrl
 * Controller of the cattrApp
 */

cattr
.controller( 'ReservationController', ['CatData','$state', function(catData,$state) {
  var cats = this;
  
  cats.date={
    start : new Date(),
    end: moment().add(13, 'months').toDate()
  }
  cats.sortorder = 'name'
  //catData.getAll();

  cats.getCats = function getCats(){
    catData.getAll()
      .$promise
      .then(function(res) {
        cats.all = res.objects
      })
      .catch(function(re) {
        console.error('failure',res);
      })
  };

  cats.getCats()

    
}])
