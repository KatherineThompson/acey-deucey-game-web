"use strict";

const angular = require("angular");

angular.module("acey-deucey").directive("adCircle", function(){
    return {
        template: `<svg class="piece" ng-class="selectedClass" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: (scope, element) => {
            element.addClass("align-center grid-block");
            
            scope.selectedClass = {};
            
            scope.$watch("isSelected", () => {
                scope.selectedClass.selected = scope.isSelected;
            });
            
            scope.$watch("isSelectable", () => {
                scope.selectedClass.selectable = scope.isSelectable;
            });
            
            scope.$watch("numPieces", () => {
                scope.selectedClass.disabled = !scope.numPieces;
            });
            
        },
        scope: {
            numPieces: "=",
            isSelected: "=",
            isSelectable: "="
        }
    };    
});