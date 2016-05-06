"use strict";

const angular = require("angular");
const _ = require("lodash");

angular.module("acey-deucey").directive("adDice", function() {
    return {
        template: `<div class="align-center v-align grid-block">
                        <div class="align-center grid-block" ng-if="!rolls[0].num">
                            <button class="button" ng-click="rollDice()">Roll dice!</button>
                        </div>
                        <div class="grid-block align-center" ng-if="rolls[0].num">
                            <div class="shrink align-center grid-block"
                                ng-class="{unusable: roll.used, 'small-offset-1': !$first}"
                                ng-repeat="roll in rolls">
                                <span class="dice">{{roll.num}}</span>
                            </div>
                        </div>
                    </div>`,
        link: function(scope) {
            scope.rollDice = () => {
                _.forEach(scope.rolls, roll => roll.num = _.sample(_.range(1, 7)));
                if (scope.rolls[0].num === scope.rolls[1].num) {
                    scope.rolls.push(_.cloneDeep(scope.rolls[0]), _.cloneDeep(scope.rolls[0]));
                }
            };
        },
        scope: {
            rolls: "="
        }
    };
});