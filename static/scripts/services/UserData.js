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

    var UserCats = $resource('/api/users/:id/cats/:catID',{id:'@id',catID:'@catID'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {method:'PUT'}
    });

    var UserReservations = $resource('/api/users/:id/reservations/:resID',{id:'@id',resID:'@resID'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {method:'PUT'}
    });

    /* lets put these here, so we don't have to redefine them each time the function returns*/
    var getOne               = (userID)    => User.get({id:userID}).$promise
    var del                  = (userID)    => User.remove({id:userID})
    var addUser              = (userData)  => new User(userData).$save()
    var update               = (userData)  => User.update({id:userData.id}, userData).$promise
    var getUserCats          = (userID)    => UserCats.get({id:userID}).$promise
    var getUserReservations  = (userID)    => UserReservations.get({id:userID}).$promise
    // just return refs to these fns
    return {
      /*getAll: User.query,*/
      getOne:     getOne,
      del:        del,
      addUser:    addUser,
      update:     update,

      getUserCats:         getUserCats,
      getUserReservations: getUserReservations
    };
  }]);
