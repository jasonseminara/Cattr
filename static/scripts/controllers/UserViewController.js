'use strict';


cattr
.controller( 'UserViewController', ['UserData','$state', function(userData,$state) {
  var userView = this;
  userData.getOne(1)
    .then(res=>{
      console.log(res)
      userView.user=res
    })
    .catch(err=>console.warn(err))
  userData.getUserCats(1)
    .then(res=>{
      console.log(res)
      userView.cats=res.objects
    })
    .catch(err=>console.warn(err))
  
  userData.getUserReservations(1)
    .then(res=>{
      console.log(res)
      userView.reservations=res.objects
    })
    .catch(err=>console.warn(err))

}]);