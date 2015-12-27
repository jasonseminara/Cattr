'use strict';

/**
 * @ngdoc service
 * @name cattrApp.CatService
 * @description
 * # CatService
 * Service in the cattrApp.
 */
cattr
  .config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }])
  .factory('CatData', ['$resource', function catFactory($resource) {  
    
    var Cat = $resource('/api/cats/:id/',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true}
    });

    return {
      getAll: Cat.query,
      
      getOne: (catID) => Cat.get({id:catID}),

      del: (catID) => Cat.remove({id:catID}),

      addCat: (catData) => new Cat(catData).$save()
      
      
    };
  }]);
