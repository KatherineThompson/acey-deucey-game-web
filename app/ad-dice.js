"use strict";

const angular = require("angular");
const _ = require("lodash");
const isAceyDeucey = require("./is-acey-deucey");

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
                        <div class="align-center shrink grid-block small-offset-1" ng-if="isAceyDeucey(rolls)">
                            <button class="centered button"
                            zf-open="doubles-modal"
                            ng-class="{disabled: isDoublesButtonDisabled()}">
                                Choose doubles
                            </button>
                            <div id="doubles-modal" zf-modal="">
                                <div class="grid-block small-up-1">
                                    <a class="close-button" zf-close="">×</a>
                                    <div class="small-12 align-center grid-block">
                                        <h2>Acey deucey!</h2>
                                    </div>
                                    <div class="small-12 align-center grid-block">
                                        <h4>Choose your doubles:</h4>
                                    </div>
                                    <div class="small-12 align-spaced grid-block">
                                        <span class="dice"
                                            ng-click="chooseDoubles(diceNum)"
                                            ng-repeat="diceNum in diceNums"
                                            zf-close="">
                                            {{diceNum}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
        link: function(scope) {
            scope.diceNums = _.range(1, 7);
            
            scope.chooseDoubles = diceNum =>  _(4).range().forEach(() => scope.rolls.push({num: diceNum, used: null}));
            
            scope.isAceyDeucey = isAceyDeucey;
            
            scope.rollDice = () => {
                _.forEach(scope.rolls, roll => roll.num = _.sample(scope.diceNums));
                // scope.rolls[0].num = 1;
                // scope.rolls[1].num = 2;
                
                if (scope.rolls[0].num === scope.rolls[1].num) {
                    scope.rolls.push(_.cloneDeep(scope.rolls[0]), _.cloneDeep(scope.rolls[0]));
                }
                
            };
            
            scope.isDoublesButtonDisabled = () => !_.every(scope.rolls, "used");    
            
        },
        scope: {
            rolls: "="
        }
    };
});