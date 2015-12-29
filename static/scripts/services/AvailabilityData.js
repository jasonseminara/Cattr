'use strict';

/**
 * @ngdoc service
 * @name cattrApp.CatService
 * @description
 * # CatService
 * Service in the cattrApp.
 */
cattr.factory('AvailabilityData', ['$resource', 

  function availabilityService($resource){
        
    var Availability = $resource('/api/availability/:id',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {method:'PUT'}
    });

    /* lets put these here, so we don't have to redefine them each time the function returns*/
    var getOne  = (availID)   => Availability.get({id:availID}).$promise;
    var del     = (availID)   => Availability.delete({id:availID}).$promise;
    var add     = (availData) => new Availability(availData).$save();
    var update  = (availData) => Availability.update({id:availData.id}, availData).$promise;

  // just return refs to these fns
    return {
      getAll  : Availability.query,
      getOne  : getOne,
      del     : del,
      add     : add,
      update  : update
    };
}]);
