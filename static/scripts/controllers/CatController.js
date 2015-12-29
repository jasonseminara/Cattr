'use strict';


cattr
.controller( 'CatController', ['CatData','AvailabilityData','$state', 
function(catData,availabilityData,$state) {
  var cat = this;
 
  cat.title=$state.current.data.title

  // define a fn so we can call it later
  cat.loadAvailability=(id)=>
    catData.getOne( id )
      .then( res=>{
        res.birthdate = moment(res.birthdate).toDate();
        angular.extend(cat,res)
      })
      .catch( err=>console.warn(err) )
  
  //trigger it now
  cat.loadAvailability($state.params.id)

  //bind it for later
  cat.reload = cat.loadAvailability.bind(null,$state.params.id)

  cat.create=(data)=>
     catData.addCat(data)
        .then(res=>$state.go('cats.detail',{id:res.id}))
        .catch(err=>console.warn(err))


  cat.update=(data)=>
    catData.update( data )
      .then(res=>$state.go('cats.detail',{id:res.id}))
        .catch(err=>console.warn(err))


  cat.useMyAddress=(data)=>
    catData.update({id:data.id,address_id:data.owner.address_id})
      .then(res=>cat.reload())
      .catch( err=>console.warn(err) )

  
  cat.del = (id)=> confirm('Are you sure you want to delete cat '+id+'?') && 
    catData.del(id)
      .then(res=>$state.go('user.list') )
      .catch( err=>console.warn(err) )


  cat.submitForm = function(fromState){
    switch($state.current.name){
      
      case 'cats.new':
        // normalize the data before we send it.
        cat.create({
          /*todo: issue 1: tags get duplicated */
          tags     : cat.tags? cat.tags.map(val=> ({name:val.substring(0,30)}) ) : [],      
          female   : cat.female == true,
          name     : cat.name,
          birthdate: cat.birthdate,
          variety  : cat.variety,
          image    : cat.image,
          description: cat.description,
          owner_id  : 1
        });
        break;

      case 'cats.edit':
        cat.update({
          /*split the tags into an array */
          /*todo: issue 1: tags get duplicated */
          tags     : cat.tags? cat.tags.map(val=> ({name:val.substring(0,30)}) ) : [],
          female   : cat.female == true,
          name     : cat.name,
          birthdate: cat.birthdate,
          variety  : cat.variety,
          image    : cat.image,
          description: cat.description,
          owner_id  : 1,
          id        : $state.params.id 
        })
        break;
    }

  };
}]);