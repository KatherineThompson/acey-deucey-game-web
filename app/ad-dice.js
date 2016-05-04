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
                            <div class="shrink align-center grid-block" ng-class="firstClass">
                                <span class="dice">{{rolls.first.num}}</span>
                            </div>
                            <div class="shrink align-center small-offset-1 grid-block" ng-class="secondClass">
                                <span class="dice">{{rolls.second.num}}</span>
                            </div>
                        </div>
                    </div>`,
        link: function(scope) {
            scope.rollDice = function() {
                // $scope.rolls = _.mapValues($scope.rolls,() => _.sample(_.range(1, 7)));
                _.forEach(scope.rolls, roll => roll.num = _.sample(_.range(1, 7)));
            };
            
            scope.firstClass = {};
            scope.secondClass = {};
            
            scope.$watch("[rolls.first.used, rolls.second.used]", () => {
                if (scope.rolls.first.used) {
                   scope.firstClass.disabled = true;
                }
                if (scope.rolls.second.used) {
                    scope.secondClass.disabled = true;
                }
            });
        },
        scope: {
            rolls: "="
        }
    };
});