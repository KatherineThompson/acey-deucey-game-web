"use strict";

const angular = require("angular");

angular.module("acey-deucey").directive("adCircle", function(){
    return {
        template: `<svg class="red piece" viewbox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"/>
                        <text font-size="40" x="50%" y="50%" dy="0.3em" text-anchor="middle">{{numPieces}}x</text>
                    </svg>`,
        link: function(scope, element) {
            element.addClass("align-center grid-block");
        },
        scope: {
            numPieces: "="
        }
    };    
});