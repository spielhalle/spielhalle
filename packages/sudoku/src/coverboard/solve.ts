/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { CoverBoard } from './cover-board';
import { DLX } from './dlx';
import { initializeExactCoverBoard } from './initialize-cover-board';

export const solve = (board: number[][], boardSize: number, boxSize: number, maxResults: number = 1): number[][][] => {
    const cover: CoverBoard = initializeExactCoverBoard(board, boardSize, boxSize);
    const dlx: DLX = new DLX(cover, boardSize, maxResults);
    dlx.runSolver();
    return dlx.results;
};
