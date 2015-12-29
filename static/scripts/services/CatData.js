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
    


    function dropUnusedFields(data,headers) {
      var db_cols = {
        id:1,
        name:1,
        birthdate:1,
        variety:1,
        female:1,
        description:1,
        last_updated:1,
        image:1,
        owner_id:1,
        address_id:1,
        tags:1,
        address:1
        }

      data =  Object.keys(data).reduce( (p,c)=>{
        if(c in db_cols) p[c]=data[c]
        return p
      },{})
      data.female = (data.female == true);
      return JSON.stringify(data);


     
    }


    var Tags = $resource('/api/tags/:id',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true}
    });



    var Cat = $resource('/api/cats/:id',{id:'@id'},{
      query: {method: 'get', isArray: false, cancellable: true},
      update: {
          method: 'PATCH',
          transformRequest: dropUnusedFields
      },
      save:   {
        method:'POST',
         transformRequest: dropUnusedFields
      }
    });




    /* lets put these here, so we don't have to redefine them each time the function returns*/
    var getOne=   (catID) => Cat.get({id:catID}).$promise
    var del=      (catID) => Cat.remove({id:catID}).$promise
    var addCat= (catData) => new Cat(catData).$save()
    
    var update = function(catData) {

      // we have to wrap this in two promises because the last thing we do is another async call that we have to wait for 
      return new Promise(function (resolve, reject) {

        Promise.all([
            Tags.query().$promise
            /*,Cat.get({ id: catData.id }).$promise*/
          ])
          .then(res => {

            var pendingTagsIndex = {}
              /*keyword index*/
            var allTagsKeywordIndex = res[0].objects.reduce(function (p, c) {
              p[c.name] = c.id
              return p;
            }, {})

            // additions and updates
            catData.tags = catData.tags? catData.tags.map(tagWord => {
              /* build an index while we're here */
              pendingTagsIndex[tagWord] = 1;

              /*if it's a known tag, assign it to this model*/
              return tagWord in allTagsKeywordIndex ? {id: allTagsKeywordIndex[tagWord]} : {name: tagWord}
            }):[]

            // deletions = dataBaseCat.tags
            // .filter( tag=>!(tag.name in pendingTagsIndex)) /*this is the list of only deletions*/
            // .map( delTag=>({id:delTag.id}))
            
            // if it's a 
            if(typeof catData.id === 'undefined'){
           
              new Cat(catData)
              .$save()
              .then(res => resolve(res))
              .catch(err => reject(err))
            
            }else{

              Cat.update(catData)
              .$promise
              .then(res => resolve(res))
              .catch(err => reject(err))
            }
          })
          .catch(err => reject(err))
      })
    };

    // just return refs to these fns
    return {
      getAll: Cat.query,
      getOne: getOne,
      del:    del,
      addCat: addCat,
      update: update
    };
  }]);
