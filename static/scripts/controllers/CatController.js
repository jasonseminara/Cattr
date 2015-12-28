'use strict';


cattr
.controller( 'CatController', ['CatData','AvailabilityData','$state', function(catData,availabilityData,$state) {
  var cat = this;
 
  // define a fn so we can call it later
  cat.loadAvailability=(id)=>
    catData.getOne( id )
      .then( res=>{
        console.log('reloaded');
        angular.extend(cat,res)
      })
      .catch( err=>console.warn(err) )
  
  //trigger it now
  cat.loadAvailability($state.params.id)
  cat.reloadAvailability = cat.loadAvailability.bind(null,$state.params.id)

  cat.del = (id)=> confirm('Are you sure you want to delete cat '+id+'?') && 
      catData.del(id)
        .then(  res=>$state.go('user.list') )
        .catch( err=>console.warn(err) )

  cat.deleteAvailability = (id)=>
      availabilityData.del(id)
        .then(  res=>cat.reloadAvailability() )
        .catch( err=>console.warn(err) )
}]);