"use strict"

const angular = require("angular");

angular.module("acey-deucey").directive("dice", function() {
    return {
        template: `<div class="align-center v-align grid-block" ng-click="rollDice()">
                        <div class="shrink align-center grid-block">
                            <span class="dice">{{rolls.first}}</span>
                        </div>
                        <div class="shrink align-center small-offset-1 grid-block">
                            <span class="dice">{{rolls.second}}</span>
                        </div>
                    </div>`,
        link: function($scope) {
            $scope.rolls = {first: 1, second: 2};
            $scope.rollDice = function() {
                $scope.rolls.first = Math.floor(Math.random() * 6 + 1);
                $scope.rolls.second = Math.floor(Math.random() * 6 + 1);
            };
        },
        scope: true
    };
});