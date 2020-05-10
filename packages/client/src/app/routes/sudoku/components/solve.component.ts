/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ViewChild } from '@angular/core';
import { knuthSolveNum } from '@spielhalle/sudoku';
import { SudokuFieldComponent } from '../modules/sudoku-board';
import { SudokuSolverService } from '../services';

@Component({
    selector: 'app-solve',
    styleUrls: ['./solve.component.scss'],
    templateUrl: './solve.component.html',
})
export class SolveComponent {

    @ViewChild(SudokuFieldComponent, {
        static: true,
    })
    public sudokuComponent: SudokuFieldComponent;
    constructor(public solverService: SudokuSolverService) { }

    public onClear(): void {
        this.sudokuComponent.clear();
    }
    public onSolve(): void {
        const solutions: number[][][] = knuthSolveNum(this.sudokuComponent.getBoard(), 9, 3, 5);
        if (solutions.length > 0) {
            this.sudokuComponent.field = solutions[0];
        }
        this.solverService.solve(this.sudokuComponent.getBoard(), 9, 3, 5).then(console.log).catch(console.error);
    }

    public onFieldChange(sudokuField: number[][]): void {

    }
}
