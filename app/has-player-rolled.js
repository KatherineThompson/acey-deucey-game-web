"use strict";

const _ = require("lodash");

function hasPlayerRolled(turnState) {
    return _.get(turnState, ["rolls", 0, "num"]);
}

module.exports = hasPlayerRolled;