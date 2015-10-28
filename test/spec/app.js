'use strict';

describe('Controller: MessageCtrl', function () {

  // load the controller's module
  beforeEach(module('contact'));

  var MessageCtrl,
    scope,
	messages;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
	messages = { 
	  fetch: function () {
	    return [{text:'msg1'}, {text:'msg2'}];
	  }
	};
    MessageCtrl = $controller('MessageCtrl', {
      $scope: scope,
      Messages: messages
    });
  }));

  it('should attach a list of messages to the scope', function () {
    expect($scope.messages.length).toBe(2);
  });
});
