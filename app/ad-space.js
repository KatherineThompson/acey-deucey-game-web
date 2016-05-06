"use strict";

const angular = require("angular");
const _ = require("lodash");
const getPlayerParams = require("./get-player-params");

angular.module("acey-deucey").directive("adSpace", function(adSelectPiece, $timeout) {
    return {
        template: `<svg class="space"
                        ng-class="{unusable: state.unusable}"
                        ng-click="placePiece()"
                        viewbox="0 0 100 350">
                        
                        <polygon ng-attr-points="{{orientationParams.polygonPoints}}"/>
                        <g class="piece"
                            ng-class="pieceClass"
                            ng-attr-transform="scale(.75), {{orientationParams.groupTransform}}"
                            ng-if="boardSpace.numPieces"
                            ng-click="selectPiece()">
                            
                            <circle cx="50" cy="175" r="50"/>
                            <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">
                                {{boardSpace.numPieces}}x
                            </text>
                        </g>
                    </svg>`,
        link: function(scope, element) {
            scope.pieceClass = {};
            
            scope.$watch("boardSpace", () => {
                scope.pieceClass.selectable = isPieceSelectable();
            } ,true);
            
            function isPieceSelectable() {
                const isCorrectPlayer = scope.boardSpace.isPlayerOne === scope.gameState.isPlayerOne;
                const pieceExists = scope.boardSpace.numPieces;
                return _.get(scope, ["turnState", "rolls", "first", "num"]) && isCorrectPlayer && pieceExists;
            }
            
            scope.selectPiece = function() {
                adSelectPiece(scope.index, scope.turnState, scope.gameState, isPieceSelectable);
                if (!scope.turnState.availableSpaces.length) {
                    scope.pieceClass.unavailable = true;
                    $timeout(() => scope.pieceClass.unavailable = false, 1000);
                }
            };
                      
            scope.placePiece = function() {
                if (scope.state.unusable || scope.turnState.currentPiecePosition === null) {
                    return;
                }
                
                const clampedIndex = _.clamp(scope.turnState.currentPiecePosition, -1, 24);
                
                const proposedMove = {
                    currentPosition: clampedIndex,
                    isBar: scope.turnState.isBar,
                    numberOfSpaces:
                        Math.abs(scope.index - clampedIndex)
                };
                
                scope.$emit("make-move", proposedMove);
                
            };
            
            scope.$watch("boardSpace.isPlayerOne", () => {
                scope.pieceClass[getPlayerParams(scope.boardSpace.isPlayerOne).spanClass] = true;
                scope.pieceClass[getPlayerParams(!scope.boardSpace.isPlayerOne).spanClass] = false;
            });
            
            scope.state = {unusable: false};
            
            scope.$watch(
                "turnState.availableSpaces",
                () => {
                    if (scope.turnState.availableSpaces) {
                        scope.state.unusable = !_.includes(scope.turnState.availableSpaces, scope.index);
                    }
                },
                true
            );
            
            if (scope.orientation === "bottom") {
                scope.orientationParams = {
                    polygonPoints: "0,350 100,350 50,0",
                    groupTransform: "translate(17, 220)"
                };
                element.addClass("bottom");
            } else {
                scope.orientationParams = {
                    polygonPoints: "0,0 100,0 50,350",
                    groupTransform: "translate(17, -105)"
                };
                element.addClass("top");
            }
        },
        scope: {
            orientation: "@",
            boardSpace: "=",
            index: "=",
            turnState: "=",
            gameState: "="
        }
    };
});