/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NumberDialogComponent } from './number-dialog.component';

@Component({
    selector: 'app-sudoku-field',
    styleUrls: ['./sudoku-field.component.scss'],
    templateUrl: './sudoku-field.component.html',
})
export class SudokuFieldComponent {
    @Output()
    public readonly field: EventEmitter<any>;
    private readonly mField: any;

    constructor(public dialog: MatDialog,
        public elementRef: ElementRef) {
        this.field = new EventEmitter(false);
    }
    public onClickCell(x: number, y: number): void {
        const dialogRef: MatDialogRef<NumberDialogComponent> = this.dialog.open(NumberDialogComponent, {
            height: 'min(90vw,90vh)',
            maxHeight: '360px',
            maxWidth: '360px',
            role: 'dialog',
            width: 'min(90vw,90vh)',
        });
        dialogRef.afterClosed().subscribe((value: number): void => {
            if (value >= 0 && value <= 9) {
                this.mField.setCell(x, y, value);
                this.field.emit(this.mField.clone());
            }
        });
    }

    public getValue(x: number, y: number): string {
        return this.mField.getCell(x, y) > 0 ? '' + this.mField.getCell(x, y) : ' ';
    }

    public clearField(): void {
        this.mField.clear();
        this.field.emit(this.mField);
    }
}
