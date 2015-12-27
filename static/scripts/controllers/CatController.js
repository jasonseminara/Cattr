'use strict';


cattr
.controller( 'CatController', ['CatData','$state', function(catData,$state) {
  var cat = this;

  cat.sexChoices = [
    {sym:'F', val:'Female'},
    {sym:'M', val:'Male'},
    {sym:'N/A', val: 'Unknown'}
    ];

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

  cat.getOne = ()=> catData.getOne($state.params.id )
    
  cat.currentCat = cat.getOne()

  return cat
}]);