/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { SudokuBoardGame } from './sudoku-board-game';
import { SudokuFieldService } from './sudoku-field.service';
@Directive({
    providers: [
        SudokuFieldService,
    ],
    selector: 'canvas[appSudokuBoard]',
})
export class SudokuBoardDirective implements OnChanges, OnDestroy, OnInit {

    public set field(f: number[][]) {
        this.sudokuService.field = f;
        this.gameBoard.setBoard(f);
    }
    @Output()
    public readonly fieldChange: EventEmitter<any>;
    @Input()
    public set boxSize(size: number) {
        console.log('KK', size);
        this.sudokuService.setBoxSize(size);
    }

    private gameBoard: SudokuBoardGame;

    constructor(public zone: NgZone,
        public elementRef: ElementRef,
        public sudokuService: SudokuFieldService) {
        this.fieldChange = new EventEmitter(false);

    }

    public ngOnInit(): void {
        this.zone.runOutsideAngular((): void => {
            this.gameBoard = new SudokuBoardGame(this.elementRef.nativeElement, true);
            this.gameBoard.start();
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        console.log('chhha', changes);
    }

    public ngOnDestroy(): void {
        if (this.gameBoard) {
            this.gameBoard.stop();
        }
    }

    public test(k: MouseEvent): void {
        // const x: number = Math.floor(k.offsetX * this.sudokuService.boardSize / this.elementRef.nativeElement.offsetWidth);
        // const y: number = Math.floor(k.offsetY * this.sudokuService.boardSize / this.elementRef.nativeElement.offsetHeight);
    }

    public clear(): void {
        this.sudokuService.clear();
        this.fieldChange.emit(this.sudokuService.field);
    }

    public getBoard(): number[][] {
        return this.sudokuService.field;
    }
}
