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
    
    $scope.selectPiece = function(index) {
        if (!$scope.turnState.rolls.first) {
            return;
        }
        
        $scope.turnState.currentPiecePosition = index;
        
        $scope.turnState.isBar = !_.inRange(index, -1, 25);
        
        const clampedIndex = _.clamp($scope.turnState.currentPiecePosition, -1, 24);
        
        $scope.turnState.availableSpaces = gameEngine.findPossibleMoves(
            $scope.gameState,
            _.values($scope.turnState.rolls),
            $scope.turnState.isBar,
            clampedIndex
        );
    };
    
    $scope.isSpaceDisabled = index => !_.includes($scope.turnState.availableSpaces, index);
    
    $scope.isPieceSelectable = (indexOrPlayerName, isBar) => {
        let isCorrectPlayer = null;
        let pieceExists = null;
        if (_.isBoolean(indexOrPlayerName)) {
            isCorrectPlayer = indexOrPlayerName === $scope.gameState.isPlayerOne;
            const activePlayer = $scope.gameState.isPlayerOne ? "playerOne" : "playerTwo";
            if (isBar) {
                pieceExists = $scope.gameState[activePlayer].barPieces;
            } else {
                pieceExists = $scope.gameState[activePlayer].initialPieces;
            }
        } else if (_.isNumber(indexOrPlayerName)) {
            isCorrectPlayer = $scope.gameState.board[indexOrPlayerName].isPlayerOne === $scope.gameState.isPlayerOne;
        }
        
        return $scope.turnState.rolls.first && isCorrectPlayer && pieceExists;
    };
});