/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { expect } from 'chai';
import 'mocha';
import { TEST_FIELDS } from '../common.spec';
import { createEmptySudokuBoard } from '../create-empty-sudoku-board';
import { isValidField } from '../validate';
import { solve } from './solve';

describe('coverboard/solve.ts', (): void => {
    describe('solve()', (): void => {
        it('should solve non empty field with boxSize 2', (): void => {
            const testField: number[][] = [[1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            const solveResult: number[][][] = solve(testField, 4, 2);
            expect(solveResult.length).greaterThan(0);
        });
        it('should setup with a client instance as endpoint3', (): void => {
            const testField: number[][] = createEmptySudokuBoard(4);
            const solveResult: number[][][] = solve(testField, 4, 2);
            expect(solveResult.length).greaterThan(0);
        });
        it('should setup with a client instance as endpoint5', (): void => {
            const testField: number[][] = TEST_FIELDS[0];
            const solveResult: number[][][] = solve(testField, 9, 3);
            expect(solveResult.length).greaterThan(0);
        });
        it('should setup with a client instance as endpoint4', (): void => {
            const testField: number[][] = JSON.parse(JSON.stringify(createEmptySudokuBoard(4)));
            const solveResult: number[][][] = solve(testField, 4, 2);
            expect(solveResult.length).greaterThan(0);
        });
        [2, 3, 4, 5].forEach((testSize: number): void => {
            const boardSize: number = testSize ** 2;
            it(`should pass for boxSize ${testSize} and boardSize ${boardSize}`, (): void => {
                const testField: number[][] = createEmptySudokuBoard(boardSize);
                const solveResult: number[][][] = solve(testField, boardSize, testSize);
                expect(solveResult.length).greaterThan(0);
                solveResult.forEach((res: any): void => {
                    // tslint:disable-next-line:no-unused-expression
                    expect(isValidField(res, boardSize, testSize)).to.be.true;
                });
            });
        });
    });
});
