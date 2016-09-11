(function (angular) {
  
  'use strict';
  
  angular.module('myApp.view1', ['ngRoute', 'ngSanitize'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
      controllerAs: 'vm'
    });
  }])
  // A sample service
  .service("calService", SampleService)
  // A view1 controller
  .controller('View1Ctrl', V1Ctrl);

  //// We can also create controller as constructor function
  function V1Ctrl($scope) {
    var vm = this;
    
    vm.arr = ["CR7","M10","R10","Z9","P6"];
    
    vm.select = function( selectedItem ) {
      vm.selectedItem = selectedItem;
    }
    
    // We can also watch this
    $scope.$watch(function () {
      return vm.name;
    }, function (newValue) {
    });

    vm.value = 1;
  }

  function SampleService($q, $timeout) {
    this.add = function ( x, y ) {
      return x + y;
    }
    this.minus = function ( x, y ) {
      return x - y;
    }
    this.divide = function (x, y) {
      if (y === 0) {
        throw new Error("Invalid params");
      }
      return x/y;
    }
    this.asyncCal = function ( x, y ) {
      var defered = $q.defer();

      $timeout(function () {
        defered.resolve( x + y );
      }, 2000);

      return defered.promise;
    }
  }
  
  // Inject DI
  V1Ctrl.$inject = ['$scope'];
  SampleService.$inject = ["$q", "$timeout"];
  
  //// We can also create directive
  angular.module('myApp.view1')
  
  .directive("showInput", function () {
    
    SIController.$inject = ["$scope", '$sce'];
    
    return {
      restrict: "E",
      scope: {
        name: "="
      },
      // Bind scope properties to controller
      bindToController: true,
      controllerAs: 'vm',
      controller: SIController,
      transclude: true,
      // replace: true,
      template: "<div ng-transclude></div>" +
                "<div>{{vm.name}}</div>", 
                // "<div ng-bind-html='vm.html'></div>",
      link: function (scope, element, attrs) {}
    };
    
    // Controller
    function SIController(scope, $sce) {
        // we can use it here
        this.moreValue = "Other value";
        // Trust as html
        // this.html = $sce.trustAsHtml("<script>(function () {console.log('abc');})()</script>");

        ////
        this.html = $sce.trustAsHtml("<b>Bold</b><input type='text' />");
        // By default, <input> tag is not safe so $sce service dont bind it unless you set it as trustAsHtml
        // this.html = "<b>Bold</b><input type='text' />";
    }
  })

  // Create the directive
  .directive('itemCounter', function () {

    function ItemCounterCtrl( $scope ) {
      var vm = this;
      // Increment
      vm.increment = function() {
          vm.value++;
      }
      // Decrement
      vm.decrement = function() {
          vm.value--;
      }
    }

    ItemCounterCtrl.$inject = ["$scope"];
    
    return {
      restrict: "E",
      scope: {
        value: "=ngModel"
      },
      require: 'ngModel',
      controller: ItemCounterCtrl,
      bindToController: true,
      controllerAs: 'vm',
      template: '<div>' +
                  '<button class="item-counter_decrement" ng-click="vm.decrement()">-</button>' +
                  '<input class="item-counter_input" ng-model="vm.value" type="number" />' +
                  '<button class="item-counter_increment" ng-click="vm.increment()">+</button>' +
                '</div>',
      link: function (scope, element, attrs, ngModel) {
        // Validator
        ngModel.$validators.integer = function (modelValue, viewValue) {
          return modelValue > 10 ? false : true;
        }

        ngModel.$formatters.push(function (modelValue) {
          return modelValue > 10 ? 10 : modelValue;
        });
      }
    };
  });
  
})(angular)

