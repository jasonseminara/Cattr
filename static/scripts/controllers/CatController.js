'use strict';


cattr
.controller( 'CatController', ['CatData','$state', function(catData,$state) {
  

  var cat = this;
 
  catData.getOne( $state.params.id )
    .then( res=>{
      // partition the availability items into open and closed items

      var pt = res.availability.partition(x=>Number.isInteger(x.host_id),'reservations','availability')
      angular.extend(cat,res,pt)


    })
    .catch( err=>console.warn(err) )

  cat.del = ( id )=>{
   if (confirm('Are you sure you want to delete cat '+id+'?'))
      catData.del(id)
        .then(  res=>$state.go('user.list') )
        .catch( err=>console.warn(err) )
  }

  
}]);