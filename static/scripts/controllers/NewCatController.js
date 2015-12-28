'use strict';


cattr
.controller( 'NewCatController', ['CatData','$state', function(catData,$state) {
  var form = this;
  form.title = "Create a Cat";
  form.submitForm = function(){
    // normalize the data before we send it.
    var newCat = {
      /*todo: issue 1: tags get duplicated */
      tags     : form.tags? form.tags.map(val=> ({name:val.substring(0,30)}) ) : [],      
      female   : form.gender == true,
      name     : form.name,
      birthdate: form.birthdate,
      variety  : form.variety,
      image    : form.image,
      description: form.description,
      owner_id  : 1
    }

    console.log(newCat)
    catData.addCat(newCat)
      .then(res=>$state.go('cats.detail',{id:res.id}))
      .catch(err=>console.warn(err))
    
  };
  return form;
}]);