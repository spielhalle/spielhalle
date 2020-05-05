/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

export const getIndex: (row: number, column: number, num: number, boardSize: number) => number =
    (row: number, column: number, num: number, boardSize: number): number => {
        return (row - 1) * boardSize * boardSize + (column - 1) * boardSize + (num - 1);
    };
