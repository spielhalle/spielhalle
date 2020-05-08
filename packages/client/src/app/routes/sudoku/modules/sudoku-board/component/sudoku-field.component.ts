/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NumberDialogComponent } from './number-dialog.component';
import { SudokuFieldService } from './sudoku-field.service';
@Component({
    providers: [
        SudokuFieldService,
    ],
    selector: 'app-sudoku-field',
    styleUrls: ['./sudoku-field.component.scss'],
    templateUrl: './sudoku-field.component.html',
})
export class SudokuFieldComponent implements OnChanges {
    @Input()
    public set field(f: number[][]) {
        this.sudokuService.field = f;
    }
    @Output()
    public readonly fieldChange: EventEmitter<any>;

    @HostBinding('style.grid-template-columns') gridColumns: string = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    @HostBinding('style.grid-template-rows') gridRows: string = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    @Input()
    public set boxSize(size: number) {
        this.sudokuService.setBoxSize(size);
    }

    constructor(public dialog: MatDialog,
        public elementRef: ElementRef,
        public sudokuService: SudokuFieldService) {
        this.fieldChange = new EventEmitter(false);
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
                this.sudokuService.setCell(x, y, value);
                this.fieldChange.emit(this.sudokuService.field);
            }
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('boxSize' in changes) {
            const boardSize: number = changes.boxSize.currentValue ** 2;
            const gridStyle: string = new Array(boardSize).fill('1fr').join(' ');
            this.gridColumns = gridStyle;
            this.gridRows = gridStyle;
        }
    }

    public test(k: MouseEvent): void {
        const x: number = Math.floor(k.offsetX * this.sudokuService.boardSize / this.elementRef.nativeElement.offsetWidth);
        const y: number = Math.floor(k.offsetY * this.sudokuService.boardSize / this.elementRef.nativeElement.offsetHeight);
        this.onClickCell(x, y);
    }

    public clear(): void {
        this.sudokuService.clear();
        this.fieldChange.emit(this.sudokuService.field);
    }

    public getBoard(): number[][] {
        return this.sudokuService.field;
    }
}
