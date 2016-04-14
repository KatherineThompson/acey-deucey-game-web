"use strict";

const angular = require("angular");

require("foundation-apps/dist/js/foundation-apps.js");
require("foundation-apps/dist/js/foundation-apps-templates.js");

require("babel!./second.js");

angular.module("acey-deucey", ["foundation"]).run(function() {
    alert("angular is running");
});