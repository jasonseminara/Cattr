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

      //getAll: Cat.query,
      
      addCat: catData => new Cat(catData).$save()
      ,

      getAll: ()=>{
        return [
        { id:1,
          name: 'Taji',    
          birthdate:'2007-01-01',
          variety:  'Russian Blue',
          owner: 'Jason Seminara',   
          sex: 'F', 
          image:'/images/18H.jpg',     
          tags: [
            'russian', 
            'grey', 
            'nails', 
            'claws', 
            'teeth'
          ],
          availability:[
            {start:'2016-05-02',end:'2016-08-06'},
            {start:'2016-02-02',end:'2016-03-06'},
            {start:'2016-03-02',end:'2016-04-06'},
            {start:'2016-04-02',end:'2016-06-06'},
            {start:'2016-06-02',end:'2016-10 s-06'}
          ],
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis accusantium delectus non, amet iste alias voluptates? Repellendus eaque, perspiciatis ipsam dicta fugiat, cupiditate provident sint qui consectetur, error labore iure?'  
        },
        { id:2,
          name: '_Taj2',    
          birthdate:'2009-01-01',
          variety:  'Russian Blue',
          owner: 'Jason Seminara',   
          sex: 'F', 
          image:'/images/18H.jpg',    
          tags: [
            'russian', 
            'grey', 
            'nails', 
            'claws', 
            'teeth'
          ],
          availability:[
            {start:'2016-05-02',end:'2016-05-06'},
            {start:'2016-05-02',end:'2016-05-06'}
          ],
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis debitis error adipisci nulla! Mollitia aspernatur, dicta earum maiores. Officiis iusto distinctio voluptatibus, sequi obcaecati aspernatur, pariatur beatae nobis voluptatum cum.'
        },
        { id:3,
          name: 'Taj3',    
          birthdate:'2009-01-01',
          variety:  'Russian Blue',
          owner: 'Jason Seminara',   
          sex: 'F', 
          image:'/images/18H.jpg',     
          tags: [
            'russian', 
            'grey', 
            'nails', 
            'claws', 
            'teeth'
          ],
          availability:[
            {start:'2016-05-02',end:'2016-05-06'},
            {start:'2016-05-02',end:'2016-05-06'}
          ],
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis debitis error adipisci nulla! Mollitia aspernatur, dicta earum maiores. Officiis iusto distinctio voluptatibus, sequi obcaecati aspernatur, pariatur beatae nobis voluptatum cum.'
        },
        { id:4,
          name: 'Cat4',    
          birthdate:'2009-01-01',
          variety:  'Russian Blue',
          owner: 'Jason Seminara',   
          sex: 'F', 
          image:'/images/36.png',     
          tags: [
            'russian', 
            'grey', 
            'nails', 
            'claws', 
            'teeth'
          ],
          availability:[
            {start:'2016-01-02',end:'2016-02-06'},
            {start:'2016-05-02',end:'2016-05-06'}
          ],
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis debitis error adipisci nulla! Mollitia aspernatur, dicta earum maiores. Officiis iusto distinctio voluptatibus, sequi obcaecati aspernatur, pariatur beatae nobis voluptatum cum.'
        }
      ]}
    };
  }]);
