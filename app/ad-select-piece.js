"use strict";
const angular = require("angular");
const _ = require("lodash");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").factory("adSelectPiece", function() {
    return function(index, turnState, gameState, isPieceSelectable) {
        if (
            !_.get(turnState, ["rolls", "first", "num"]) ||
            !isPieceSelectable()
        ) {
            return;
        }
        
        turnState.currentPiecePosition = index;
        
        turnState.isBar = !_.inRange(index, -1, 25);
        
        const clampedIndex = _.clamp(turnState.currentPiecePosition, -1, 24);
        
        const rolls = [];
        
        for (let roll in turnState.rolls) {
            if (!turnState.rolls[roll].used) {
                rolls.push(turnState.rolls[roll].num);
            }
        }
        
        turnState.availableSpaces = gameEngine.findPossibleMoves(
            gameState,
            rolls,
            turnState.isBar,
            clampedIndex
        );
        
        if (!turnState.availableSpaces.length) {
            turnState.currentPiecePosition = null;
            turnState.isBar = null;
        }            
    };
});