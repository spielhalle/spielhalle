/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */
/// <reference lib='webworker' />
import { knuthSolve } from '@donmahallem/sudoku';
import { SudokuBenchmarkMessage, SudokuBenchmarkMessageType } from './sudoku-benchmark-message';

const reportStatus = (status: SudokuBenchmarkMessage): void => {
    self.postMessage(status);
};
addEventListener('message', (evt: MessageEvent): void => {
    const size: number = evt.data || 9;
    reportStatus({
        boardSize: size,
        type: SudokuBenchmarkMessageType.STARTING,
    });
    const startTime: number = Date.now();
    let results: number = 0;
    let lastResult: number = 0;
    knuthSolve(new Array(size)
        .fill(0)
        .map((): number[] => new Array<number>(size).fill(0)), size, Math.sqrt(size), (board: number[][]): boolean => {
            results += 1;
            const tDelta: number = Date.now() - startTime;
            if (tDelta - lastResult > 100 || results === 1) {
                lastResult = tDelta;
                reportStatus({
                    board,
                    boardSize: size,
                    results,
                    time: tDelta,
                    type: SudokuBenchmarkMessageType.PROGRESS,
                });
            }
            return false;
        });
    const endTime: number = Date.now();
    reportStatus({
        boardSize: size,
        results,
        time: endTime - startTime,
        type: SudokuBenchmarkMessageType.RESULT,
    });
});
