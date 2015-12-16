'use strict';

describe('Controller: ReservationcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('cattrApp'));

  var ReservationcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservationcontrollerCtrl = $controller('ReservationcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReservationcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
