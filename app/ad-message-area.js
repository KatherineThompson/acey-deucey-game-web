"use strict";

const angular = require("angular");
const _ = require("lodash");
const getPlayerParams = require("./get-player-params");
const isAceyDeucey = require("./is-acey-deucey");
const gameEngine = require("acey-deucey-game-engine");

angular.module("acey-deucey").directive("adMessageArea", function() {
    return {
        template: `<div class="message-area vertical grid-block">
                        <p class="text-center">
                            <span ng-class="getPlayerParams(activePlayer).spanClass">
                                {{getPlayerParams(activePlayer).playerName}}</span>,
                            it's your turn
                        </p>
                        <button class="expand success button"
                            ng-click="submitTurn()"
                            ng-class="{disabled: !submitEnabled}">
                            Submit turn
                        </button>
                        <button class="expand warning button"
                            ng-class="{disabled: !resetEnabled}"
                            ng-click="resetTurn()">
                            Reset turn
                        </button>
                        <button id="reset-game" class="expand red button"
                            ng-click="resetGame()">
                            Reset game
                        </button>
                    </div>`,
        link: function(scope, element) {
            scope.$watch("turnState.rolls", newRolls => scope.resetEnabled = _.some(newRolls, "used"), true);
            
            scope.$watch("turnState.rolls", newRolls => {
                let diceRoll = _(newRolls).map("num").take(3).value();
                
                if (!gameEngine.getAceyDeucey(diceRoll).isAceyDeucey) {
                    diceRoll = _(newRolls).map("num").take(2).value();
                }
                scope.submitEnabled = scope.turnState.initialGameState &&
                    gameEngine.isValidTurn(
                        scope.turnState.initialGameState,
                        diceRoll,
                        scope.turnState.proposedMoves
                    ) && !(isAceyDeucey(newRolls) && _.every(newRolls, "used"));

            }, true);
            
            element.addClass("shrink grid-block");

            scope.getPlayerParams = getPlayerParams;
            
            scope.resetTurn = function() {
                scope.$emit("reset-turn", "resetTurn");
            };
            
            scope.submitTurn = function() {
                scope.$emit("submit-turn", "submit");
            };
            
            scope.resetGame = function() {
                scope.$emit("reset-game", "resetGame");
            };
        },
        scope: {
            activePlayer: "=",
            turnState: "=",
            gameState: "="
        }
    };
});