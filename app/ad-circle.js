"use strict";

const angular = require("angular");
const _ = require("lodash");
const getPlayerParams = require("./get-player-params");

angular.module("acey-deucey").directive("adCircle", function(adSelectPiece, $timeout) {
    return {
        template: `<svg class="piece" ng-class="selectedClass" ng-click="selectPiece()" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: (scope, element) => {
            element.addClass("align-center grid-block");
            element.addClass(getPlayerParams(scope.pieceIsPlayerOne).spanClass);
            
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
            
            scope.$watch("[gameState.isPlayerOne, gameState.playerOne, gameState.playerTwo, turnState.rolls]", () => {
                scope.selectedClass.selectable = isPieceSelectable();
            }, true);
            
            scope.$watch("numPieces", () => {
                scope.selectedClass.unusable = !scope.numPieces;
            });
            
            scope.selectPiece = function() {
                adSelectPiece(scope.index, scope.turnState, scope.gameState, isPieceSelectable);
                if (!scope.turnState.availableSpaces.length) {
                    element.addClass("unavailable");
                    $timeout(() => element.removeClass("unavailable"), 1000);
                }
            };
            
            function isPieceSelectable() {
                if (!scope.gameState) {
                    return false;
                }  
                const isCorrectPlayer = scope.pieceIsPlayerOne === scope.gameState.isPlayerOne;
                const activePlayer = scope.gameState.isPlayerOne ? "playerOne" : "playerTwo";
                let pieceExists;
                if (scope.isBar) {
                    pieceExists = scope.gameState[activePlayer].barPieces;
                } else {
                    pieceExists = scope.gameState[activePlayer].initialPieces;
                }
                return _.get(scope, ["turnState", "rolls", "first", "num"]) && isCorrectPlayer && pieceExists;
            }            
            
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