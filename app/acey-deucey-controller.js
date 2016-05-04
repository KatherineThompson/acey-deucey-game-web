"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.gameState = gameEngine.getInitialGameState();
    // $scope.gameState.isPlayerOne = false;
    // $scope.gameState.playerOne.barPieces = 1;
    // $scope.gameState.playerOne.initialPieces = 0;
    // $scope.gameState.playerTwo.barPieces = 1;
    // $scope.gameState.playerTwo.initialPieces = 0;
    $scope.firstQuadrantIndices = _.range(0, 6);
    $scope.secondQuadrantIndices = _.range(6, 12);
    $scope.thirdQuadrantIndices = _.range(17, 11);
    $scope.fourthQuadrantIndices = _.range(23, 17);
    $scope.turnState = {
        rolls: {first: null, second: null},
        currentPiecePosition: null,
        availableSpaces: [],
        isBar: null
    };
    
    $scope.$on("make-move", (event, proposedMove) => {
        $scope.gameState = gameEngine.makeMove($scope.gameState, proposedMove);
    });
    
});