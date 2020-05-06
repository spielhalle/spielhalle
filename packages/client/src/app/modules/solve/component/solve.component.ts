/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ViewChild } from '@angular/core';
import { SudokuFieldComponent } from '../../sudoku-field';

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
    constructor() { }

    public clearField(): void {
        this.sudokuComponent.clearField();
    }
}
