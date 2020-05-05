/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { EMPTY_CELL } from './constants';

export const generateEmptyField = (boxSize: number): number[][] => {
    const boardSize: number = boxSize ** 2;
    return new Array(boardSize).fill(0).map((): number[] => new Array<number>(boardSize).fill(EMPTY_CELL));
};

export const TEST_FIELDS: number[][][] = [
    [[8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]],
];
