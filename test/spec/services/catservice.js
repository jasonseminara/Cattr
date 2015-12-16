'use strict';

describe('Service: CatService', function () {

  // load the service's module
  beforeEach(module('cattrApp'));

  // instantiate service
  var CatService;
  beforeEach(inject(function (_CatService_) {
    CatService = _CatService_;
  }));

  it('should do something', function () {
    expect(!!CatService).toBe(true);
  });

});
