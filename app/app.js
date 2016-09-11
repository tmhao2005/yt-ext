'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$compileProvider', function($locationProvider, $routeProvider, $compileProvider) {
  // $locationProvider.hashPrefix('!');
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
  
  //// Disable class & comment directives
  // $compileProvider.cssClassDirectivesEnabled(false);
  // $compileProvider.commentDirectivesEnabled(false);
  
}]);
