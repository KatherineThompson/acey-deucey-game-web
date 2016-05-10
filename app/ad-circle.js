"use strict";

const angular = require("angular");
const getPlayerParams = require("./get-player-params");
const hasPlayerRolled = require("./has-player-rolled");
const gameEngine = require("acey-deucey-game-engine");
const _ = require("lodash");

angular.module("acey-deucey").directive("adCircle", function(adSelectPiece, $timeout) {
    return {
        template: `<svg class="piece" ng-class="selectedClass" ng-click="selectPiece()" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: (scope, element) => {
            element.addClass("align-center grid-block");
            element.addClass(getPlayerParams(scope.pieceIsPlayerOne).spanClass);
            
            const isWinningPiece = (scope.pieceIsPlayerOne && scope.index === 24) ||
                    (!scope.pieceIsPlayerOne && scope.index === -1);
            
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
            
            scope.$watch("[turnState.rolls, turnState.currentPiecePosition]", () => {
                scope.selectedClass.selectable = isPieceSelectable();
            }, true);
            
            scope.$watch("[numPieces, gameState.isPlayerOne, turnState.currentPiecePosition]", () => {
                if (isWinningPiece) {
                    scope.selectedClass.unusable = !(scope.numPieces || isPieceSelectable());                
                } else {
                    scope.selectedClass.unusable = !scope.numPieces;
                }
            }, true);
            
            function selectWinningPiece() {
                debugger;
                if (!isPieceSelectable()) {
                    element.addClass("unavailable");
                    $timeout(() => element.removeClass("unavailable"), 1000);
                    return;
                }
                const proposedMove =  {
                    currentPosition: scope.turnState.currentPiecePosition,
                    isBar: scope.turnState.isBar,
                    numberOfSpaces: Math.abs(scope.index - scope.turnState.currentPiecePosition)
                };
                scope.$emit("make-move", proposedMove);                    
            }
            
            scope.selectPiece = function() {
                if (isWinningPiece) {
                    selectWinningPiece();
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
                    } else if (isWinningPiece) {
                        const isNotCurrentPiece = scope.turnState.currentPiecePosition !== null;
                        const canMoveToSpace = _.includes(scope.turnState.availableSpaces, 24) &&
                            gameEngine.canMoveOffBoard(scope.gameState);
                        pieceOrSpaceExists = isNotCurrentPiece && canMoveToSpace;
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