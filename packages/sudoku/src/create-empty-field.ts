/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { EMPTY_CELL } from './constants';

export const createEmptyFieldFromBoardSize = (boardSize: number): number[][] => {
    return new Array(boardSize).fill(0).map((): number[] => new Array<number>(boardSize).fill(EMPTY_CELL));
};
