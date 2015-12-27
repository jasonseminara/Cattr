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
      getOne: function(catID) {
        return Cat.get({id:catID});
      },

      getAll: Cat.query,
      
      addCat: catData => new Cat(catData).$save()
      

      
    };
  }]);
