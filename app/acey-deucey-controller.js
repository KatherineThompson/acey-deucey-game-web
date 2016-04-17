"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.buttonClick = {count: 0};
    $scope.onButtonClick = function() {
      $scope.buttonClick.count++;  
    };
    console.log(gameEngine);
});