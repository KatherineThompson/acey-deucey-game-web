"use strict";

const angular = require("angular");

angular.module("acey-deucey").directive("space", function() {
    return {
        template: `<svg ng-class="orientationParams.svgClass" viewbox="0 0 100 350">
                        <polygon ng-attr-points="{{orientationParams.polygonPoints}}"/>
                        <g class="white piece" ng-attr-transform="scale(.75), {{orientationParams.groupTransform}}">
                            <circle cx="50" cy="175" r="50"/>
                            <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">5x</text>
                        </g>
                    </svg>`,
        link: function(scope) {
            if (scope.orientation === "bottom") {
                scope.orientationParams = {
                    polygonPoints: "0,350 100,350 50,0",
                    groupTransform: "translate(17, 220)",
                    svgClass: "space bottom"                    
                }
            } else {
                scope.orientationParams = {
                    polygonPoints: "0,0 100,0 50,350",
                    groupTransform: "translate(17, -105)",
                    svgClass: "space top"
                };
            }
        },
        scope: {
            orientation: "@"
        }
    };
});