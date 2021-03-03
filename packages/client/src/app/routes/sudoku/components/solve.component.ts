/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { knuthSolveNum } from '@donmahallem/sudoku';
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
    public boxSize: number = 3;
    constructor(public solverService: SudokuSolverService,
        public activatedRoute: ActivatedRoute) {
        this.activatedRoute
            .params
            .subscribe((params: Params): void => {
                this.boxSize = Math.sqrt(parseInt(params.sudokuSize, 10));
                console.log('new board size', this.boxSize);
            });
    }

    public onClear(): void {
        this.sudokuComponent.clear();
    }
    public onSolve(): void {
        const solutions: number[][][] = knuthSolveNum(this.sudokuComponent.getBoard(), this.boxSize ** 2, this.boxSize, 5);
        if (solutions.length > 0) {
            this.sudokuComponent.field = solutions[0];
        }
        this.solverService.solve(this.sudokuComponent.getBoard(), this.boxSize ** 2, this.boxSize, 5)
            .then(console.log).catch(console.error);
    }

    public onFieldChange(sudokuField: number[][]): void {

    }
}
