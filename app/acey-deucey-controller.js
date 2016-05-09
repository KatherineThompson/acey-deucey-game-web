"use strict";

const angular = require("angular");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");
const assert = require("assert");

angular.module("acey-deucey").controller("AceyDeuceyCtrl", function($scope) {
    $scope.gameState = gameEngine.getInitialGameState();
    $scope.firstQuadrantIndices = _.range(0, 6);
    $scope.secondQuadrantIndices = _.range(6, 12);
    $scope.thirdQuadrantIndices = _.range(17, 11);
    $scope.fourthQuadrantIndices = _.range(23, 17);
    $scope.turnState = {
        rolls: [{num: null, used: null}, {num: null, used: null}],
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
        if ($scope.turnState.rolls.length > 4) {
            $scope.turnState.rolls = _.take($scope.turnState.rolls, 2);
        }
    }
    
    function resetRolls() {
        $scope.turnState.rolls = _($scope.turnState.rolls).take(2).map(() => ({num: null, used: null})).value();
    }
    function resetWholeTurnState() {
        resetRolls();
        resetPieces();
        $scope.turnState.initialGameState = null;
        $scope.turnState.proposedMoves = [];
    }
    
    $scope.$on("submit-turn", () => {
        let diceRoll = _($scope.turnState.rolls).map("num").take(3).value();
        
        if (!gameEngine.getAceyDeucey(diceRoll).isAceyDeucey) {
            diceRoll = _($scope.turnState.rolls).map("num").take(2).value();
        }
        
        $scope.gameState = gameEngine.makeTurn(
            $scope.turnState.initialGameState,
            diceRoll,
            $scope.turnState.proposedMoves
        );
        resetWholeTurnState();
    });
    
    $scope.$on("reset-turn", () => {
        if (!$scope.turnState.initialGameState) {
            return;
        }
        $scope.gameState = $scope.turnState.initialGameState;    
        resetPieces();
        resetDiceUsed();
        $scope.turnState.proposedMoves = [];
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

