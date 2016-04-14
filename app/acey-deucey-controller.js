"use strict";

const angular = require("angular");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.buttonClick = {count: 0};
    $scope.onButtonClick = function() {
      $scope.buttonClick.count++;  
    };
});