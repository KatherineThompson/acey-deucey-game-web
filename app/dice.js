"use strict"

const angular = require("angular");

angular.module("acey-deucey").directive("dice", function() {
    return {
        template: `<div class="align-center v-align grid-block">
                        <div class="shrink align-center grid-block">
                            <span class="dice">4</span>
                        </div>
                        <div class="shrink align-center small-offset-1 grid-block">
                            <span class="dice">1</span>
                        </div>
                    </div>`
    };
});