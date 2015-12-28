'use strict';


cattr
.controller( 'AvailabilityController', ['AvailabilityData','$state', function(availabilityData,$state) {
  var avail = this;
 

  avail.create = function(catID,next){
    if(!avail.date) return;
    
    var newAvail = {
      start   : avail.date.start,
      end     : avail.date.end,
      cat_id  : catID
    }

    // send the data over
    availabilityData.add(newAvail)
      .then(res=>next(res))
      .catch(err=>console.warn(err))
    
  }


  avail.deleteAvailability = (id)=>
    confirm('Are you sure you want to this availability?') && 
      availabilityData.del(id)
        .then(  res=>$state.reload() )
        .catch( err=>console.warn(err) )
}]);