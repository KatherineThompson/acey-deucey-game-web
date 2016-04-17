"use strict";

const angular = require("angular");

require("foundation-apps/dist/js/foundation-apps");
require("foundation-apps/dist/js/foundation-apps-templates");

angular.module("acey-deucey", ["foundation"]);

require("babel!./acey-deucey-controller");
require("babel!./dice");
require("babel!./space");
require("babel!./ad-circle");