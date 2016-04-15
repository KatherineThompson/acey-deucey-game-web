"use strict";

const angular = require("angular");

angular.module("acey-deucey").directive("space", function() {
    return {
        template: `<svg class="space" viewbox="0 0 100 350">
                        <polygon ng-attr-points="{{orientationParams.polygonPoints}}"/>
                        <g class="white piece" transform="scale(.75), translate(17, -105)">
                            <circle cx="50" cy="175" r="50"/>
                            <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">5x</text>
                        </g>
                    </svg>`,
        link: function(scope) {
            scope.orientationParams = {
                polygonPoints: "0,0 100,0 50,350"
            };
        },
        scope: {
            orientation: "@"
        }
    };
});