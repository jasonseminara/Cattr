'use strict';


cattr
.controller( 'NewUserController', ['CatData','$state','$http', function(catData,$state,$http) {
  var userForm = this;

  userForm.submitForm = function(){
    var u = userForm.user

    if(u.pass === u.pass_confirm){
      return $http.post('/register/',u)
      .then(function succ(res){
          console.log(res);
        },function err(error){
          console.warn(error);
        }
      )
    }
  }

}]);