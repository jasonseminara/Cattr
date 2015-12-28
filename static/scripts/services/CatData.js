'use strict';

/**
 * @ngdoc service
 * @name cattrApp.CatService
 * @description
 * # CatService
 * Service in the cattrApp.
 */
cattr
  .factory('CatData', ['$resource', function catFactory($resource) {  
    
    var Cat = $resource('/api/cats/:id',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {method:'PUT'}
    });

    /* lets put these here, so we don't have to redefine them each time the function returns*/
    var getOne=   (catID) => Cat.get({id:catID}).$promise
    var del=      (catID) => Cat.remove({id:catID}).$promise
    var addCat= (catData) => new Cat(catData).$save()
    var update= (catData) => Cat.update({id:catData.id}, catData).$promise


    // just return refs to these fns
    return {
      getAll: Cat.query,
      getOne: getOne,
      del:    del,
      addCat: addCat,
      update: update
    };
  }]);
