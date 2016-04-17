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
                        <button class=" expand alert button">Reset turn</button>
                    </div>`,
        link: function(scope, element) {
            scope.activePlayerParams = getPlayerParams(scope.activePlayer);
            element.addClass("shrink grid-block");
        },
        scope: {
            activePlayer: "="
        }
    };
});