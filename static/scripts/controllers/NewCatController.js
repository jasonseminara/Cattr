'use strict';


cattr
.controller( 'NewCatController', ['CatData','$state', function(catData,$state) {
  var form = this;

  form.submitForm = function(){
    // normalize the data before we send it.
    var newCat = {
      /*split the tags into an array */
      /*todo: issue 1: tags get duplicated */
      tags     : form.tagslist? form.tagslist.split(/,\s*/).map(val=> ({name:val}) ) : [],
      female   : !!form.gender,
      name     : form.name,
      birthdate: form.birthdate,
      variety  : form.variety,
      image    : form.image,
      description: form.description,
      owner_id  : 1
    }

    console.log(newCat)
    catData.addCat(newCat)
      .then(res=>$state.go('user.list'))
      .catch(err=>console.warn(err))
    
  };
  return form;
}]);