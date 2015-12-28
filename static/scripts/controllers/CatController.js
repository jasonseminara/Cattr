'use strict';


cattr
.controller( 'CatController', ['CatData','$state', function(catData,$state) {
  var cat = this;
 

  catData.getOne( $state.params.id )
    .then( res=> angular.extend(cat,res) )
    .catch( err=>console.warn(err) )


  cat.del = (id)=> confirm('Are you sure you want to delete cat '+id+'?') || 
      catData.del(id)
        .then(  res=>$state.go('user.list') )
        .catch( err=>console.warn(err) )
}]);