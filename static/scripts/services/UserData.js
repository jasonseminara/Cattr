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
  .factory('UserData', ['$resource', function userFactory($resource) {  
    
    var User = $resource('/api/users/:id/',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {method:'PUT'}
    });

    /* lets put these here, so we don't have to redefine them each time the function returns*/
    var getOne=   (userID) => User.get({id:userID}).$promise
    var del=      (userID) => User.remove({id:userID})
    var addUser= (userData)=> new User(userData).$save()
    var update= (userData) => User.update({id:userData.id}, userData).$promise

    // just return refs to these fns
    return {
      /*getAll: User.query,*/
      getOne: getOne,
      del:    del,
      addUser: addUser,
      update: update
    };
  }]);
