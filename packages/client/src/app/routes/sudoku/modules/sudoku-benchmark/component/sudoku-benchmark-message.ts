/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

export enum SudokuBenchmarkMessageType {
    STARTING = 0,
    RESULT = 1,
}
export interface ISudokuBenchmarkMessage {
    boardSize: number;
    results?: number;
    time?: number;
    type: SudokuBenchmarkMessageType;
}
