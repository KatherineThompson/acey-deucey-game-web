"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");
const assert = require("assert");

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
        isBar: null,
        initialGameState: null,
        proposedMoves: []
    };
    
    function resetPieces() {
        $scope.turnState.currentPiecePosition = null;
        $scope.turnState.isBar = null;
        $scope.turnState.availableSpaces = [];
    }
    
    function resetDiceUsed() {
        _.forEach($scope.turnState.rolls, roll => roll.used = null);
    }
    
    function resetRolls() {
        _.forEach($scope.turnState.rolls, roll => {
            roll.used = null;
            roll.num = null;
        });
    }
    function resetTurnState() {
        resetRolls();
        resetPieces();
        $scope.turnState.initialGameState = null;
        $scope.proposedMoves = [];
    }
    
    $scope.$on("submit-turn", () => {
        const diceRoll = [$scope.turnState.rolls.first.num, $scope.turnState.rolls.second.num]
        $scope.gameState = gameEngine.makeTurn(
            $scope.turnState.initialGameState,
            diceRoll,
            $scope.turnState.proposedMoves
        );
        debugger;
        $scope.gameState.isPlayerOne = !$scope.gameState.isPlayerOne;
        resetTurnState();
    });
    
    $scope.$on("reset-turn", () => {
        if (!$scope.turnState.initialGameState) {
            return;
        }
        $scope.gameState = $scope.turnState.initialGameState;    
        resetPieces();
        resetDiceUsed();
        $scope.turnState.initialGameState = null;
    }); 
    
    $scope.$on("make-move", (event, proposedMove) => {
        if (!$scope.turnState.initialGameState) {
            $scope.turnState.initialGameState = $scope.gameState;
        }
        $scope.gameState = gameEngine.makeMove($scope.gameState, proposedMove);
        $scope.turnState.proposedMoves.push(proposedMove);
        resetPieces();
        const matchingRoll = _.find($scope.turnState.rolls, {used: null, num: proposedMove.numberOfSpaces});
        assert(matchingRoll, `could not find matching roll for num = ${proposedMove.numberOfSpaces}`);
        matchingRoll.used = true;
    });
    
});

