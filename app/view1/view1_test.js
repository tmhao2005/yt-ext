'use strict';

describe('myApp.view1 module', function() {

  // Require modules
  beforeEach(module('myApp.view1'));
  
  describe('view1 controller', function(){
    
    var $scope, 
        $rootScope, 
        $controller, 
        $compile,
        $timeout;
    
    beforeEach(inject(function (_$rootScope_, _$controller_, _$compile_, _$timeout_) {
      $rootScope = _$rootScope_;
      // Renew scope 
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $controller = _$controller_;
      $timeout = _$timeout_;
    }));
    
    // Test controller
    it('Should set correct item', function() {
      //spec body
      var view1Ctrl = $controller('View1Ctrl', {$scope: $scope});
      view1Ctrl.select("M10");
      expect(view1Ctrl.selectedItem).toBe("M10");
    });
    
    // Some test cases for this directive
    describe("Directive show-input", function () {

      var ctrlV1, element;

      beforeEach(function () {
        // Get controller
        ctrlV1 = $controller('View1Ctrl', {$scope: $scope});
        // For using controllerAs
        $scope.vm = ctrlV1;
        var el = angular.element(
          '<show-input name="vm.name"><div class="selected-item">This value is {{vm.selectedItem}}</div></show-input>'
        );
        element = $compile(el)($scope);
      });

      it("Must have the same values with parent", function () {
        $scope.vm.select("M10");
        $scope.vm.name = "CR7";
        $scope.$digest();
        // Find selected item
        var stItem = element.children()[0];
        // ??? why??? element.find(".selected-item");
        expect(angular.element(stItem).text()).toBe("This value is M10");
        // expect(stItem.text()).toBe("This value is M10");

        // And here's my question. How can we test a complex directive???
      });
    });

    // we compose the new test for an example of service
    // then implement it later as following
    describe("Sample service", function () {
      
      // Inject the service first
      var calService;
      beforeEach(inject(function (_calService_) {
        calService = _calService_;
      }));

      it("Some default functions must work correct result", function () {
        expect(calService.add(1, 1)).toBe(2);
        expect(calService.minus(1, 1)).toBe(0);
        expect(calService.divide(2, 2)).toBe(1);
        // If throwing error, use the annonymous function instead like this
        expect(function () {
          calService.divide(2, 0);
        }).toThrow(new Error("Invalid params"));
      });
      
      it("Async cal function must take some time to complete", inject(function ($timeout) {
        var verifiedResult;
        calService.asyncCal(1, 1).then(function (returnedValue) {
          verifiedResult = returnedValue;
        });
        // ??? it is perhaps equal to done()
        // it's like a magic 
        $timeout.flush();
        expect(verifiedResult).toBe(2);
      }));
    });

    // Counter directive
    describe("Counter directive", function () {
      var element, el, scope, ctrl;
      // buttons
      var btnUp, btnDown;
      beforeEach(function () {
        // Require something
        el = angular.element(
          '<div><item-counter ng-model="parentValue"></item-counter></div>'
        );
        // Create value in scope
        $scope.parentValue = 1;
        element = $compile(el)($scope);
        // Try to get controller
        ctrl = element.find("item-counter").controller("itemCounter");
        // Use jquery instead
        // I dont know why element jQLite cannot work in this case
        // so I have to use jquery instead
        element = $(element);
        // Find two buttons
        btnDown = element.find(".item-counter_decrement");
        btnUp = element.find(".item-counter_increment");
      });
      
      it("should increase value correct", function () {
        expect(ctrl.value).toBe(1);
        ctrl.increment();
        expect(ctrl.value).toBe(2);
      });

      it("should decrease value correct", function () {
        expect(ctrl.value).toBe(1);
        ctrl.decrement();
        expect(ctrl.value).toBe(0);
      });
      
      it("should have the 2 buttons", function () {
        expect(btnUp).not.toBeUndefined();
        expect(btnDown).not.toBeUndefined();
      });
      
      it("should increase correctly after clicking up", function () {
        btnUp.click();
        expect(ctrl.value).toBe(2);
      });

      it("should decrease correctly after clicking down", function () {
        btnDown.click();
        expect(ctrl.value).toBe(0);
      });

      it("should reset correctly", function () {
        $scope.parentValue = 10;
        $scope.$digest();
        expect(ctrl.value).toBe(10);
      });
    });
  });
});