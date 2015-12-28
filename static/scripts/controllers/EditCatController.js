'use strict';


cattr
.controller( 'EditCatController', ['CatData','$state', function(catData,$state) {
  var form = this;
  form.title = "Edit a Cat"

  catData.getOne($state.params.id)
      .then(res=>{
        res.birthdate = new Date(res.birthdate)
        angular.extend(form,res)
      })
      .catch(err=>console.warn(err))

  form.submitForm = function(){

     //normalize the data before we send it.
    var cat = {
      /*split the tags into an array */
      /*todo: issue 1: tags get duplicated */
      tags     : form.tags? form.tags.map(val=> ({name:val.substring(0,30)}) ) : [],
      female   : form.female == true,
      name     : form.name,
      birthdate: form.birthdate,
      variety  : form.variety,
      image    : form.image,
      description: form.description,
      owner_id  : 1,
      id        : $state.params.id 
    }


    console.log(form)
    catData.update(cat)
      .then(res=>$state.go('user.list'))
      .catch(err=>console.warn(err))
    
  };
  return form;
}]);