/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */
/// <reference lib="webworker" />
import { knuthSolve } from '@spielhalle/sudoku';
addEventListener('message', (evt: MessageEvent): void => {
    const results: number[][][] = knuthSolve(evt.data, 9, 3, 10);
    self.postMessage(results);
});
