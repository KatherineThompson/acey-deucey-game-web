"use strict";

function getPlayerParams(isPlayerOne) {
    if (isPlayerOne) {
        return {
            spanClass: "red",
            playerName: "Red"
        };
    } else {
        return {
            spanClass: "white",
            playerName: "White"
        };
    }    
}

module.exports = getPlayerParams;