"use strict";

const angular = require("angular");
const _ = require("lodash");

angular.module("acey-deucey").directive("adDice", function() {
    return {
        template: `<div class="align-center v-align grid-block">
                        <div class="align-center grid-block" ng-if="!rolls[0].num">
                            <button class="centered button" ng-click="rollDice()">Roll dice!</button>
                        </div>
                        <div class="grid-block align-center shrink" ng-if="rolls[0].num">
                            <div class="shrink align-center grid-block"
                                ng-class="{unusable: roll.used, 'small-offset-1': !$first}"
                                ng-repeat="roll in rolls">
                                <span class="dice">{{roll.num}}</span>
                            </div>
                        </div>
                        <div class="align-center shrink grid-block small-offset-1" ng-if="isAceyDeucey()">
                            <button class="centered button"
                            zf-open="doublesModal"
                            ng-class="{disabled: doublesDisabled}">
                                Choose doubles
                            </button>
                            <div id="doublesModal" zf-modal="">
                                <div class="grid-block small-up-1">
                                    <a class="close-button" zf-close="">×</a>
                                    <div class="small-12 align-center grid-block">
                                        <h2>Acey deucey!</h2>
                                    </div>
                                    <div class="small-12 align-center grid-block">
                                        <h4>Choose your doubles:</h4>
                                    </div>
                                    <div class="small-12 align-spaced grid-block">
                                        <span ng-repeat="num in [1, 2, 3, 4, 5, 6]">{{num}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
        link: function(scope) {
            scope.rollDice = () => {
                // _.forEach(scope.rolls, roll => roll.num = _.sample(_.range(1, 7)));
                scope.rolls[0].num = 1;
                scope.rolls[1].num = 2;
                
                if (scope.rolls[0].num === scope.rolls[1].num) {
                    scope.rolls.push(_.cloneDeep(scope.rolls[0]), _.cloneDeep(scope.rolls[0]));
                }
                
            };
            
            scope.isAceyDeucey = function() {
                return _.some(scope.rolls, {num: 2}) && _.some(scope.rolls, {num: 1});
            }
            
            scope.$watch("rolls", newRolls => scope.doublesDisabled = !_.every(newRolls, "used"), true);
        },
        scope: {
            rolls: "="
        }
    };
});