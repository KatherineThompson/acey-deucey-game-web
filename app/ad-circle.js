"use strict";

const angular = require("angular");
const getPlayerParams = require("./get-player-params");
const hasPlayerRolled = require("./has-player-rolled");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").directive("adCircle", function(adSelectPiece, $timeout) {
    return {
        template: `<svg class="piece" ng-class="selectedClass" ng-click="selectPiece()" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: (scope, element) => {
            element.addClass("align-center grid-block");
            element.addClass(getPlayerParams(scope.pieceIsPlayerOne).spanClass);
            
            function isWinningPiece(){
                return (scope.pieceIsPlayerOne && scope.index === 24) ||
                    (!scope.pieceIsPlayerOne && scope.index === -1);
            }
            
            scope.selectedClass = {};
            
            scope.$watch(
                "[turnState.currentPiecePosition, turnState.availableSpaces]", 
                ([currentPiecePosition, availableSpaces]) => {
                    scope.selectedClass.selected = 
                        currentPiecePosition === scope.index &&
                        availableSpaces;
                }, 
                true
            );
            
            scope.$watch("[turnState.rolls]", () => {
                scope.selectedClass.selectable = isPieceSelectable();
            }, true);
            
            scope.$watch("[numPieces, gameState.isPlayerOne, turnState.currentPiecePosition]", () => {
                if (isWinningPiece()) {
                    scope.selectedClass.unusable = !hasPlayerRolled(scope.turnState) &&
                        scope.currentPiecePosition !== null;
                } else {
                    scope.selectedClass.unusable = !scope.numPieces;
                }
            }, true);
            
            scope.selectPiece = function() {
                if (isWinningPiece()) {
                    if (
                        scope.turnState.currentPiecePosition === null ||
                        !gameEngine.canMoveOffBoard(scope.gameState)
                    ) {
                        return;
                    }
                    const proposedMove =  {
                        currentPosition: scope.turnState.currentPiecePosition,
                        isBar: scope.turnState.isBar,
                        numberOfSpaces: Math.abs(scope.index - scope.turnState.currentPiecePosition)
                    };
                    scope.$emit("make-move", proposedMove);                    
                } else {
                    adSelectPiece(scope.index, scope.turnState, scope.gameState, isPieceSelectable);
                    if (!scope.turnState.availableSpaces.length) {
                        element.addClass("unavailable");
                        $timeout(() => element.removeClass("unavailable"), 1000);
                    }
                }
            };
            
            function isPieceSelectable() {
                if (!scope.gameState || !hasPlayerRolled(scope.turnState)) {
                    return false;
                }
                const isBar = (scope.index === -2 && scope.isPlayerOne) ||
                    (scope.index === 25 && !scope.isPlayerOne);
                const isCorrectPlayer = scope.pieceIsPlayerOne === scope.gameState.isPlayerOne;
                const activePlayer = scope.gameState.isPlayerOne ? "playerOne" : "playerTwo";
                let pieceOrSpaceExists;
                if (isCorrectPlayer) {
                    if (isBar) {
                        pieceOrSpaceExists = scope.gameState[activePlayer].barPieces;
                    } else if (isWinningPiece()) {
                        pieceOrSpaceExists = gameEngine.canMoveOffBoard(scope.gameState);
                    } else {
                        pieceOrSpaceExists = scope.gameState[activePlayer].initialPieces;
                    }
                }
                return pieceOrSpaceExists;
            }            
            
        },
        
        scope: {
            numPieces: "=",
            isSelected: "=",
            index: "=",
            gameState: "=",
            turnState: "=",
            pieceIsPlayerOne: "="
        }
    };    
});