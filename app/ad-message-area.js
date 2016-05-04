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
                        <button class="expand success button">Submit turn</button>
                        <button class="expand alert button" ng-click="resetTurn()">Reset turn</button>
                    </div>`,
        link: function(scope, element) {
            scope.activePlayerParams = getPlayerParams(scope.activePlayer);
            element.addClass("shrink grid-block");
            
            scope.resetTurn = function() {
                scope.$emit("reset-turn", "reset");
            }
            
            scope.submitTurn = function() {
                scope.$emit("submit-turn", "submit");
            }
        },
        scope: {
            activePlayer: "="
        }
    };
});