'use strict';


cattr
.controller( 'CatController', ['CatData','$state', function(catData,$state) {
  var cat = this;

  cat.add = function(){
    var f = document.querySelector('#catphoto').files[0],
        r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      console.log(e,data,f)
      //send you binary data via $http or $resource or do anything else with it
    }
    r.readAsArrayBuffer(f);
  };

  cat.del = function(id){
    catData.del(id)
      .$promise
      .then((res)=>alert('cat deleted'),$state.go('cats.list'))
      .catch((err)=>console.warn(err))
  } 
  cat.getOne = ()=> catData.getOne($state.params.id )
    
  cat.currentCat = cat.getOne()
 return cat
}]);