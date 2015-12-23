'use strict';


cattr
.controller( 'UserViewController', ['CatData','$state', function(catData,$state) {
  var userView = this;

  userView.myCats = catData.getAll();

  userView.myReservations = catData.getAll();

}]);