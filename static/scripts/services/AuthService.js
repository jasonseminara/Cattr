cattr.factory( 'AuthService', function() {
  var currentUser;

  return {
    login: function() {},
    logout: function() {},
    isLoggedIn: function() {},
    currentUser: function() {return {id:1}}
  };
})