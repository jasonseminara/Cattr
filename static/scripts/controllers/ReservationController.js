'use strict';

function isDate(d){
  return (d instanceof Date && !isNaN(d.valueOf()))
}
/**
 * @ngdoc function
 * @name cattrApp.controller:ReservationcontrollerCtrl
 * @description
 * # ReservationcontrollerCtrl
 * Controller of the cattrApp
 */

cattr
.controller( 'ReservationController', ['CatData','$state', function(catData,$state) {
  var self = this;
  
  
  self.date={
    start : new Date(),
    end: moment().add(13, 'months').toDate()
  }
  self.sortorder = 'name'
  self.all=catData.getAll();

  //self.currentCat = 909090909;
  /*self.getCats = function getCats(){
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
*/
    
}]);
