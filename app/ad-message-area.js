"use strict";

const angular = require("angular");
const getPlayerParams = require("./get-player-params");

angular.module("acey-deucey").directive("adMessageArea", function() {
    return {
        template: `<div class="message-area vertical grid-block">
                        <p class="text-center">
                            <span ng-class="activePlayerParams.spanClass">{{activePlayerParams.playerName}}</span>,
                            it's your turn
                        </p>
                        <button class="expand success button"
                            ng-click="submitTurn()"
                            ng-class="{disabled: submitStatus}">
                            Submit turn
                        </button>
                        <button class="expand alert button"
                            ng-class="{disabled: resetStatus}"
                            ng-click="resetTurn()">
                            Reset turn
                        </button>
                    </div>`,
        link: function(scope, element) {
            scope.resetStatus; 
            
            scope.$watch("[turnState.rolls.first.used, turnState.rolls.second.used]", () => {
                scope.resetStatus = !(scope.turnState.rolls.first.used || scope.turnState.rolls.second.used);
            }, true);
            
            scope.submitStatus;
            
            scope.$watch("[turnState.rolls.first.used, turnState.rolls.second.used]", () => {
                scope.submitStatus = !(scope.turnState.rolls.first.used && scope.turnState.rolls.second.used);
            }, true);
            
            scope.activePlayerParams = getPlayerParams(scope.activePlayer);
            element.addClass("shrink grid-block");
            
            scope.resetTurn = function() {
                scope.$emit("reset-turn", "reset");
            };
            
            scope.submitTurn = function() {
                scope.$emit("submit-turn", "submit");
            };
        },
        scope: {
            activePlayer: "=",
            turnState: "="
        }
    };
});