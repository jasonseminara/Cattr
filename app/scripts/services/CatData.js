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
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])
  .factory('CatData', ['$resource', function catFactory($resource) {  
    
    var Cat = $resource('/api/cats/:id/',{id:'@id'});

    return {
      getOne: function(catID) {
        return Cat.get({id:catID});
      },

      getAll: Cat.query,
      
      addCat: function(catData){
        return new Cat(catData).$save();
      }
    };
  }]);
