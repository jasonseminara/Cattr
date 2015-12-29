'use strict';


cattr
.controller( 'CatController', ['CatData','AvailabilityData','$state', 
function(catData,availabilityData,$state) {
  var cat = this;
 
  cat.title=$state.current.data ? $state.current.data.title : ""

  // define a fn so we can call it later

  cat.initForm =function(){
    catData.getOne( $state.params.id )
      .then( res=>{
        if($state.current.name == 'cats.edit'){
          res.birthdate = moment(res.birthdate).toDate();
          res.tags = res.tags.map(t=>t.name)
        }
        angular.extend(cat,res)
      })
      .catch( err=>console.warn(err) )
  }

  cat.initTags = function(){
    catData.getTags()
      .$promise
      .then(res=>{
        cat.allTags = res.objects
      })
  }



  //deprecated
  cat.reload = cat.initForm



  cat.useMyAddress=(data)=>{
    
    catData.update({id:data.id, address_id:data.owner.address_id})
      .then(res=>{
        cat.address = res.address
        cat.address_id = res.address_id
      })
      .catch( err=>console.warn("Something went wrong",err) )
  }

  
  cat.del = (id,next)=> confirm('Are you sure you want to delete cat '+id+'?') && 
    catData.del(id)
      .then(res=>next && next(res) )
      .catch( err=>console.warn(err) )



  cat.submitForm = ()=> {
    if($state.current.name == 'cats.new') cat.owner_id = 1
    catData.update(cat)
      .then(res=>$state.go('cats.detail',{id:res.id}))
      .catch(err=>console.warn(err))
  }
}]);