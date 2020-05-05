/**!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku
 */

import { expect } from 'chai';
import 'mocha';
import { generateEmptyField } from '../common.spec';
import { solve } from './solve';

describe('coverboard/solve.ts', (): void => {
    describe('solve()', (): void => {
        it('should solve empty field with boxSize 2', (): void => {
            expect(solve([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 4, 2)).to.equal(true);
        });
        it('should solve non empty field with boxSize 2', (): void => {
            expect(solve([[1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 4, 2)).to.equal(true);
            expect(solve([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 3, 0]], 4, 2)).to.equal(true);
        });
        it('should setup with a client instance as endpoint3', (): void => {
            expect(solve(generateEmptyField(2), 4, 2)).to.equal(true);
        });
        it('should setup with a client instance as endpoint4', (): void => {
            const test: any = JSON.parse(JSON.stringify(generateEmptyField(2)));
            expect(solve(test, 4, 2)).to.equal(true);
        });
        [2, 3, 4].forEach((testSize: number): void => {
            const boardSize: number = testSize ** 2;
            it(`should pass for boxSize ${testSize} and boardSize ${boardSize}`, (): void => {
                const testValue: number[][] = generateEmptyField(testSize);
                expect(solve(testValue, boardSize, testSize)).to.equal(true);
            });
        });
    });
});
