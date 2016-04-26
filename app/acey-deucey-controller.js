"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.gameState = gameEngine.getInitialGameState();
    // $scope.gameState.isPlayerOne = false;
    $scope.gameState.playerOne.barPieces = 1;
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
    $scope.selectPiece = function(index) {
        if (!$scope.turnState.rolls.first) {
          return;
        }
        $scope.turnState.currentPiecePosition = index;
        
        $scope.turnState.isBar = index < -1 || index > 24 ? true : false;
        
        const clampedIndex = _.clamp($scope.turnState.currentPiecePosition, -1, 24);
        
        $scope.turnState.availableSpaces = gameEngine.findPossibleMoves(
            $scope.gameState,
            _.values($scope.turnState.rolls),
            $scope.turnState.isBar,
            clampedIndex
        );
        debugger;
    };
    $scope.isSpaceDisabled = index => !_.includes($scope.turnState.availableSpaces, index);
    $scope.isPieceSelectable = (indexOrPlayerName) => {
        let isCorrectPlayer = null;
        if (_.isBoolean(indexOrPlayerName)) {
            isCorrectPlayer = indexOrPlayerName === $scope.gameState.isPlayerOne;
        } else if (_.isNumber(indexOrPlayerName)) {
            isCorrectPlayer = $scope.gameState.board[indexOrPlayerName].isPlayerOne === $scope.gameState.isPlayerOne;
        }
        
        return $scope.turnState.rolls.first && isCorrectPlayer;
    };
});