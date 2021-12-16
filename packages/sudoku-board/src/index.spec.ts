/*
 * Package @spielhalle/sudoku-board
 * Source https://spielhalle.github.io/spielhalle/
 */

import { expect } from 'chai';
import 'mocha';
import * as idx from './sudoku-board';

describe('index', (): void => {
    it('should contain SudokuBoardGame', (): void => {
        expect(idx.SudokuBoardGame).to.to.exist;
    });
});
