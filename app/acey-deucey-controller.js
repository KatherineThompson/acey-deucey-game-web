"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.gameState = gameEngine.getInitialGameState();
});