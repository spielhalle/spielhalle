/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, PLATFORM_ID } from '@angular/core';
import type SudokuBoardMod from '@spielhalle/sudoku-board';
import { AbstractPixiRenderDirective } from 'src/app/components';
import { SUDOKU_BOARD_TOKEN } from './../sudoku-board-loader-token';
import { SudokuFieldService } from './sudoku-field.service';
@Directive({
    providers: [
        SudokuFieldService,
    ],
    selector: 'canvas[appSudokuBoard]',
})
export class SudokuBoardDirective extends AbstractPixiRenderDirective<SudokuBoardMod.SudokuBoardGameApp> {

    public constructor(public zone: NgZone,
        el: ElementRef,
        @Inject(PLATFORM_ID) platformId: string,
        public sudokuService: SudokuFieldService,
        @Optional() @Inject(SUDOKU_BOARD_TOKEN) private tcg: Promise<typeof SudokuBoardMod>) {
        super(zone, el, platformId);
        this.fieldChange = new EventEmitter(false);

    }
    public set field(f: number[][]) {
        this.sudokuService.field = f;
        this.app.setBoard(f);
    }
    @Output()
    public readonly fieldChange: EventEmitter<any>;
    @Input()
    public set boxSize(size: number) {
        this.sudokuService.setBoxSize(size);
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



    public async loadGame(): Promise<SudokuBoardMod.SudokuBoardGameApp> {
        return new (await this.tcg).SudokuBoardGameApp({
            view: this.el.nativeElement,
        });
    }

}
