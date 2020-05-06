/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component } from '@angular/core';

@Component({
    selector: 'app-play',
    styleUrls: ['./sudoku.component.scss'],
    templateUrl: './sudoku.component.html',
})
export class SudokuComponent {
    title: string = 'spielhalle';
    private field: number[][] = [[]];
    public setValue(x: number, y: number, value: number): void {
        console.log(x, y, value);
        this.field[x][y] = value;
        console.log(this.field);
    }
}
