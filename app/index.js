"use strict";

const angular = require("angular");

require("foundation-apps/dist/js/foundation-apps");
require("foundation-apps/dist/js/foundation-apps-templates");

angular.module("acey-deucey", ["foundation"]);

require("./acey-deucey-controller");
require("./ad-dice");
require("./ad-space");
require("./ad-circle");
require("./ad-message-area");