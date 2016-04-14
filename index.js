"use strict";

const angular = require("angular");

require("foundation-apps/dist/js/foundation-apps");
require("foundation-apps/dist/js/foundation-apps-templates");

// require("babel!./second.js");

angular.module("acey-deucey", ["foundation"]);

require("babel!./app/acey-deucey-controller");
require("babel!./app/dice");