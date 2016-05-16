"use strict";
const gameEngine = require("acey-deucey-game-engine");

function getPieceInfo(gameState, proposedMove) {
    const playerMultiplier = gameState.isPlayerOne ? 1 : -1;
    const proposedSpace = proposedMove.currentPosition + proposedMove.numberOfSpaces * playerMultiplier;
    const winningIndex = gameState.isPlayerOne ?
        gameEngine.constants.PLAYER_ONE_END_SPACE : gameEngine.constants.PLAYER_TWO_END_SPACE;
    const startSpace = gameState.isPlayerOne ?
        gameEngine.constants.PLAYER_ONE_START_SPACE : gameEngine.constants.PLAYER_TWO_START_SPACE;
    return {
        isBar: proposedMove.currentPosition === startSpace - 1 * playerMultiplier,
        winningIndex: winningIndex,
        isWinningPiece: (gameState.isPlayerOne && proposedSpace >= winningIndex) ||
            (!gameState.isPlayerOne && proposedSpace <= winningIndex)
    };
}

module.exports = getPieceInfo;