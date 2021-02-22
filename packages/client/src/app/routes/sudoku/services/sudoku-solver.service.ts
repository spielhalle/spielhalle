/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Injectable } from '@angular/core';
import { knuthSolveNum } from '@donmahallem/sudoku';

@Injectable()
export class SudokuSolverService {

    public constructor() {
    }
    public solve(board: number[][], boardSize: number, boxSize: number, solutions: number = 1): Promise<number[][][]> {
        if (typeof Worker !== 'undefined') {
            // Create a new
            return new Promise((resolve: (arg: number[][][]) => void): void => {
                const worker: Worker = new Worker('./sudoku-solver.worker', { name: 'solveSudokuWorker', type: 'module' });
                worker.onmessage = (evt: MessageEvent): void => {
                    resolve(evt.data);
                };
                worker.postMessage(board);
            });
        } else {
            return new Promise((resolve: (arg: number[][][]) => void): void => {
                const results: number[][][] = knuthSolveNum(board, boardSize, boxSize, solutions);
                resolve(results);
            });
        }
    }

}
