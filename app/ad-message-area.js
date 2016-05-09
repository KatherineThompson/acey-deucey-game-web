"use strict";

const angular = require("angular");
const _ = require("lodash");
const getPlayerParams = require("./get-player-params");
const isAceyDeucey = require("./is-acey-deucey");

angular.module("acey-deucey").directive("adMessageArea", function() {
    return {
        template: `<div class="message-area vertical grid-block">
                        <p class="text-center">
                            <span ng-class="getPlayerParams(activePlayer).spanClass">
                                {{getPlayerParams(activePlayer).playerName}}
                            </span>,
                            it's your turn
                        </p>
                        <button class="expand success button"
                            ng-click="submitTurn()"
                            ng-class="{disabled: !submitEnabled}">
                            Submit turn
                        </button>
                        <button class="expand alert button"
                            ng-class="{disabled: !resetEnabled}"
                            ng-click="resetTurn()">
                            Reset turn
                        </button>
                    </div>`,
        link: function(scope, element) {
            scope.$watch("turnState.rolls", newRolls => scope.resetEnabled = _.some(newRolls, "used"), true);
            
            scope.$watch("turnState.rolls", newRolls => {
                scope.submitEnabled = _.every(newRolls, "used") && !isAceyDeucey(newRolls);
            }, true);
            
            element.addClass("shrink grid-block");

            scope.getPlayerParams = getPlayerParams;
            
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