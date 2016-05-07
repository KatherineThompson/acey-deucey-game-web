"use strict";

const _ = require("lodash");

function isAceyDeucey(rolls) {
     return _.some(rolls, {num: 2}) && _.some(rolls, {num: 1}) && rolls.length === 2;
}

module.exports = isAceyDeucey;