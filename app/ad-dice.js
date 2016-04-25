"use strict";

const angular = require("angular");
const _ = require("lodash");

angular.module("acey-deucey").directive("adDice", function() {
    return {
        template: `<div class="align-center v-align grid-block">
                        <div class="align-center grid-block" ng-if="!rolls.first">
                            <button class="button" ng-click="rollDice()">Roll dice!</button>
                        </div>
                        <div class="grid-block align-center" ng-if="rolls.first">
                            <div class="shrink align-center grid-block">
                                <span class="dice">{{rolls.first}}</span>
                            </div>
                            <div class="shrink align-center small-offset-1 grid-block">
                                <span class="dice">{{rolls.second}}</span>
                            </div>
                        </div>
                    </div>`,
        link: function($scope) {
            $scope.rollDice = function() {
                $scope.rolls = _.mapValues($scope.rolls,() => _.sample(_.range(1, 7)));
            };
        },
        scope: {
            rolls: "="
        }
    };
});