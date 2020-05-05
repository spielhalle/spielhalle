/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { EMPTY_CELL } from '../constants';

export const checkConstraint = (board: number[][], row: number, constraint: boolean[], column: number): boolean => {
    if (board[row][column] !== EMPTY_CELL) {
        if (!constraint[board[row][column] - 1]) {
            constraint[board[row][column] - 1] = true;
        } else {
            return false;
        }
    }
    return true;
};
