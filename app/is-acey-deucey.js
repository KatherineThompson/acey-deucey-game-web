"use strict";

const _ = require("lodash");

function isAceyDeucey(rolls) {
    return _(rolls).map("num").sortBy().isEqual([1, 2]);
}

module.exports = isAceyDeucey;