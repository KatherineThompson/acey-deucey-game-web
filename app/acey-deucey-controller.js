"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.gameState = gameEngine.getInitialGameState();
    // $scope.gameState.isPlayerOne = false;
    $scope.firstQuadrantIndices = _.range(0, 6);
    $scope.secondQuadrantIndices = _.range(6, 12);
    $scope.thirdQuadrantIndices = _.range(12, 18);
    $scope.fourthQuadrantIndices = _.range(18, 24);
    $scope.turnState = {
        rolls: {first: null, second: null},
        currentPiecePosition: null,
        availableSpaces: []
    };
    $scope.selectPiece = function() {
        if (!$scope.turnState.rolls.first) {
          return;
        }
        $scope.turnState.currentPiecePosition = -1;
        $scope.turnState.availableSpaces = [$scope.turnState.rolls.first - 1, $scope.turnState.rolls.second - 1];
    };
    $scope.isSpaceDisabled = index => !_.includes($scope.turnState.availableSpaces, index);
});