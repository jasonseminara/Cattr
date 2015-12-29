'use strict';


cattr.controller( 'AvailabilityController', ['AvailabilityData','$state','AuthService', 

  function(availableService,$state,authsvc) {
    var avail = this;
    
    var warn=err=>console.warn(err)

    var saveData =(data,next)=> 
      availableService.update(data)
        .then((res)=>next && next(res))
        .catch(warn)


    avail.create = function(catID,next){
      if(!avail.date) return;
      
      var newAvail = {
        start   : avail.date.start,
        end     : avail.date.end,
        cat_id  : catID
      }

      // send the data over
      availableService.add(newAvail)
        .then(res=>next && next(res))
        .catch(warn)
      
    }


    avail.reserve = function(availID,next){
      if(!availID) return;

      var reservation = {
        host_id  : authsvc.currentUser().id,
        reservation_taken : new Date(),
        id:availID
      }
      saveData(reservation,next)
      // send the data over
      
      
    }

    avail.unReserve = function(availID,next){
      if(!availID) return;

      var reservation = {
        host_id  : null,
        reservation_taken : null,
        id:availID
      }
      // send the data over
      saveData(reservation,next)
      
    }

    avail.deleteAvailability = (id,next)=>
      confirm('Are you sure you want to delete this availability?') && 
        availableService.del(id)
          .then(  (res)=>next && next(res) )
          .catch( warn )
}]);