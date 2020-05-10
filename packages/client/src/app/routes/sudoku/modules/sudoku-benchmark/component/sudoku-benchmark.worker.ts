/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */
/// <reference lib="webworker" />
import { knuthSolveNum } from '@spielhalle/sudoku';
import { ISudokuBenchmarkMessage, SudokuBenchmarkMessageType } from './sudoku-benchmark-message';

const reportStatus = (status: ISudokuBenchmarkMessage): void => {
    self.postMessage(status);
};
addEventListener('message', (evt: MessageEvent): void => {
    const size: number = evt.data || 9;
    reportStatus({
        boardSize: size,
        type: SudokuBenchmarkMessageType.STARTING,
    });
    const startTime: number = Date.now();
    const results: number[][][] = knuthSolveNum(new Array(size)
        .fill(0)
        .map((): number[] => new Array<number>(size).fill(0)), size, Math.sqrt(size), 10 ** 5);
    const endTime: number = Date.now();
    reportStatus({
        boardSize: size,
        results: results.length,
        time: endTime - startTime,
        type: SudokuBenchmarkMessageType.RESULT,
    });
});
