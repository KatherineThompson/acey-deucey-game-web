"use strict";
const angular = require("angular");
const _ = require("lodash");
const gameEngine = require("acey-deucey-game-engine");
const hasPlayerRolled = require("./has-player-rolled");

angular.module("acey-deucey").factory("adSelectPiece", function() {
    return function(index, turnState, gameState, isPieceSelectable) {
        if (!hasPlayerRolled(turnState) || !isPieceSelectable()) {
            return;
        }
        
        turnState.currentPiecePosition = index;
        
        turnState.isBar = !_.inRange(index, -1, 25);
        
        const clampedIndex = _.clamp(turnState.currentPiecePosition, -1, 24);

        const unusedRolls = _(turnState.rolls).reject("used").map("num").value();

        turnState.availableSpaces = gameEngine.findPossibleMoves(
            gameState,
            unusedRolls,
            turnState.isBar,
            clampedIndex
        );
        
        if (!turnState.availableSpaces.length) {
            turnState.currentPiecePosition = null;
            turnState.isBar = null;
        }            
    };
});