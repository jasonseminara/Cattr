'use strict';


cattr
.controller( 'UserViewController', ['UserData','$state','AuthService', function(userService,$state,auth) {
  var userView = this;
  
  userView.templates={
    reservation:"/views/partial.reservation.list.html",
    cats:"/views/partial.cats.list.html"
  }


  userView.getUserCats = ()=>
    userService.getUserCats(auth.currentUser().id)
      .then(res=> userView.cats=res.objects)
      .catch(err=>console.warn(err))
  
  userView.getUserReservations =()=> 
    userService.getUserReservations(auth.currentUser().id)
      .then(res=>userView.reservations=res.objects)
      .catch(err=>console.warn(err))

  userView.reload =()=>{
    userView.getUserCats()
    userView.getUserReservations()
  }

  userService.getOne(auth.currentUser().id)
    .then(res=> userView.user=res)
    .catch(err=>console.warn(err))
}]);