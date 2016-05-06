"use strict";

const angular = require("angular");
const _ = require("lodash");
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
                            ng-class="{disabled: submitDisabled}">
                            Submit turn
                        </button>
                        <button class="expand alert button"
                            ng-class="{disabled: resetDisabled}"
                            ng-click="resetTurn()">
                            Reset turn
                        </button>
                    </div>`,
        link: function(scope, element) {
            scope.$watch("turnState.rolls", newRolls => scope.resetDisabled = !_.some(newRolls, "used"), true);
            
            scope.$watch("turnState.rolls", newRolls => scope.submitDisabled = !_.every(newRolls, "used"), true);
            
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