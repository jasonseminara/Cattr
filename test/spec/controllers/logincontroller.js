'use strict';

describe('Controller: LogincontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('cattrApp'));

  var LogincontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogincontrollerCtrl = $controller('LogincontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LogincontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
