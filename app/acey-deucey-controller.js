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
        rolls: {first: {num: null, used: null}, second: {num: null, used: null}},
        currentPiecePosition: null,
        availableSpaces: [],
        isBar: null
    };
    $scope.turnGameState = null;
    
    // maybe keep original gameState and array or prosed moves
    
    function resetPieces() {
        $scope.turnState.currentPiecePosition = null;
        $scope.turnState.isBar = null;
        $scope.turnState.availableSpaces = [];
    }
    
    function resetDiceCount() {
        for (let roll in $scope.turnState.rolls) {
            $scope.turnState.rolls[roll].used = null;
        }
    }
    
    $scope.$on("reset-turn", () => {
        if (!$scope.turnGameState) {
            return;
        }
        $scope.gameState = $scope.turnGameState;    
        resetPieces();
        resetDiceCount();
    }); 
    
    $scope.$on("make-move", (event, proposedMove) => {
        if (!$scope.turnGameState) {
            $scope.turnGameState = $scope.gameState;
        }
        $scope.gameState = gameEngine.makeMove($scope.gameState, proposedMove);
        resetPieces();
        for (let roll in $scope.turnState.rolls) {
            if (
                !$scope.turnState.rolls[roll].used &&
                $scope.turnState.rolls[roll].num === proposedMove.numberOfSpaces
            ) {
                $scope.turnState.rolls[roll].used = true;
                break;
            }
        }
    });
    
});