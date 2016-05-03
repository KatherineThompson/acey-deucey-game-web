"use strict";

const angular = require("angular");
const _ = require("lodash");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").directive("adCircle", function(){
    return {
        template: `<svg class="piece" ng-class="selectedClass" ng-click="selectPiece()" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: (scope, element) => {
            element.addClass("align-center grid-block");
            
            scope.selectedClass = {};
            
            scope.$watch("[turnState.currentPiecePosition, turnState.availableSpaces]", () => {
                scope.selectedClass.selected = scope.turnState &&
                    scope.turnState.currentPiecePosition === scope.index &&
                    scope.turnState.availableSpaces;
            }, true);
            
            scope.$watch("[gameState, turnState]", () => {
                scope.selectedClass.selectable = scope.isPieceSelectable();
            }, true);
            
            scope.$watch("numPieces", () => {
                scope.selectedClass.disabled = !scope.numPieces;
            });
            
            scope.selectPiece = function() {
                if (!_.get(scope, ["turnState", "rolls", "first"])) {
                    return;
                }
                
                scope.turnState.currentPiecePosition = scope.index;
                
                scope.turnState.isBar = !_.inRange(scope.index, -1, 25);
                
                const clampedIndex = _.clamp(scope.turnState.currentPiecePosition, -1, 24);
                
                scope.turnState.availableSpaces = gameEngine.findPossibleMoves(
                    scope.gameState,
                    _.values(scope.turnState.rolls),
                    scope.turnState.isBar,
                    clampedIndex
                );
            };
            
            scope.isPieceSelectable = () => {
                let isCorrectPlayer = null;
                let pieceExists = null;
                if (_.isBoolean(scope.pieceIsPlayerOne)) {
                    isCorrectPlayer = scope.pieceIsPlayerOne === scope.gameState.isPlayerOne;
                    const activePlayer = scope.gameState.isPlayerOne ? "playerOne" : "playerTwo";
                    if (scope.isBar) {
                        pieceExists = scope.gameState[activePlayer].barPieces;
                    } else {
                        pieceExists = scope.gameState[activePlayer].initialPieces;
                    }
                }
        // } else if (_.isNumber(indexOrPlayerName)) {
        //     isCorrectPlayer = scope.gameState.board[indexOrPlayerName].isPlayerOne === scope.gameState.isPlayerOne;
        // }
                return _.get(scope, ["turnState", "rolls", "first"]) && isCorrectPlayer && pieceExists;
            };            
            
        },
        
        scope: {
            numPieces: "=",
            isSelected: "=",
            index: "=",
            gameState: "=",
            turnState: "=",
            pieceIsPlayerOne: "=",
            isBar: "="
        }
    };    
});