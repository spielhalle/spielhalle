/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

export enum SudokuBenchmarkMessageType {
    STARTING = 0,
    RESULT = 1,
    PROGRESS = 2,
}
export type SudokuBenchmarkMessage = {
    boardSize: number;
    type: SudokuBenchmarkMessageType.STARTING;
} | {
    board: number[][],
    boardSize: number;
    results: number;
    time: number;
    type: SudokuBenchmarkMessageType.PROGRESS;
} | {
    boardSize: number;
    results: number;
    time: number;
    type: SudokuBenchmarkMessageType.RESULT;
};
