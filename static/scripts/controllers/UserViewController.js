'use strict';


cattr
.controller( 'UserViewController', ['UserData','$state', function(userData,$state) {
  var userView = this;
  userData.getOne(1)
    .then(res=>{
      console.log(res)
      userView.userData=res
    })
    .catch(err=>console.warn(err))


  //userView.myReservations = catData.getAll();

}]);