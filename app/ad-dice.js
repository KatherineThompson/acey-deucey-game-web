"use strict";

const angular = require("angular");
const _ = require("lodash");

angular.module("acey-deucey").directive("adDice", function() {
    return {
        template: `<div class="align-center v-align grid-block">
                        <div class="align-center grid-block" ng-if="!rolls.first.num">
                            <button class="button" ng-click="rollDice()">Roll dice!</button>
                        </div>
                        <div class="grid-block align-center" ng-if="rolls.first.num">
                            <div class="shrink align-center grid-block" ng-class="firstDieClass">
                                <span class="dice">{{rolls.first.num}}</span>
                            </div>
                            <div class="shrink align-center small-offset-1 grid-block" ng-class="secondDieClass">
                                <span class="dice">{{rolls.second.num}}</span>
                            </div>
                        </div>
                    </div>`,
        link: function(scope) {
            scope.rollDice = () => _.forEach(scope.rolls, roll => roll.num = _.sample(_.range(1, 7)));
            
            scope.firstDieClass = {};
            scope.secondDieClass = {};
            
            scope.$watch("rolls.first.used", () => {
                scope.firstDieClass.unusable = scope.rolls.first.used;
            });
            scope.$watch("rolls.second.used", () => {
                scope.secondDieClass.unusable = scope.rolls.second.used;
            });
        },
        scope: {
            rolls: "="
        }
    };
});