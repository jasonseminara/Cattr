'use strict';

function isDate(d){
  return (d instanceof Date && !isNaN(d.valueOf()))
}
/**
 * @ngdoc function
 * @name cattrApp.controller:ReservationcontrollerCtrl
 * @description
 * # ReservationcontrollerCtrl
 * Controller of the cattrApp
 */

cattr
.filter('dateConstrained', function(){
  
  return function(input,dates){
    
    var filtered = input || [];
    if (!dates) return filtered;
    
    // todo: change this so it actually filters out the out-of-range reservations on each cat. 
    // filter over the cats to find any items who have dates within our range.
    return filtered.filter( function(item) {
      // filter out those cats who don't meet the date criteria. 
      return item.availability.filter( function(avail){

          var inStart = isDate(dates.start) ? dates.start <= new Date(avail.start) : true;
          var inEnd   = isDate(dates.end)   ? dates.end   >=  new Date(avail.end)   : true;
            
          return inStart && inEnd;
        }
      ).length;
    });

  };
})

.controller( 'ReservationController', ['CatData','$state', function(catData,$state) {
  var self = this;
  
  
  self.date={
    start : new Date(),
    end: moment().add(13, 'months').toDate()
  }
  self.sortorder = 'name'
  self.all=[
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
        {start:'2016-02-02',end:'2016-02-06'},
        {start:'2016-04-02',end:'2016-04-06'},
        {start:'2016-04-02',end:'2016-04-06'},
        {start:'2016-04-02',end:'2016-04-06'},
        {start:'2016-04-02',end:'2016-04-06'}
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
  ];

  self.currentCat = (function(temp){
    temp = self.all.filter(cat=>cat.id==$state.params.id);
    return temp.length?temp[0]:undefined;
    })() 
  //self.currentCat = 909090909;
  console.log(self.currentCat,self.all[2])
  console.log(+$state.params.id)
  /*self.getCats = function getCats(){
    catData.getAll()
      .$promise
      .then(function(res) {
        console.log(res);
      })
      .catch(function(re) {
        console.error('failure',res);
      })
  };

  self.getCats()
*/
    
}]);
