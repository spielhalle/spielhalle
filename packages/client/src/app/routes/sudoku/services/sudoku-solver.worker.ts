/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */
/// <reference lib="webworker" />
import { knuthSolveNum } from '@spielhalle/sudoku';
addEventListener('message', (evt: MessageEvent): void => {
    const results: number[][][] = knuthSolveNum(evt.data, 9, 3, 10);
    self.postMessage(results);
});
