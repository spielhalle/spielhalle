/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, NgZone, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatTable } from '@angular/material/table';
import { Observable, Subscriber, TeardownLogic } from 'rxjs';
import { ISudokuBenchmarkMessage, SudokuBenchmarkMessageType } from './sudoku-benchmark-message';
@Component({
    selector: 'app-sudoku-benchmark',
    styleUrls: ['./sudoku-benchmark.component.scss'],
    templateUrl: './sudoku-benchmark.component.html',
})
export class SudokuBenchmarkComponent {

    public calculating: boolean = false;
    public results: any[] = [];
    displayedColumns: string[] = ['boardSize', 'time', 'results'];
    public sudokuBoardSize: number = 9;
    @ViewChild(MatTable)
    public resultTable: MatTable<any>;
    public constructor(public zone: NgZone) {

    }
    public startTest(): void {
        this.calculating = true;
        const obs: Observable<ISudokuBenchmarkMessage> = new Observable((sub: Subscriber<ISudokuBenchmarkMessage>): TeardownLogic => {
            const worker: Worker = new Worker('./sudoku-benchmark.worker', { name: 'benchmarkSudokuWorker', type: 'module' });
            worker.onmessage = (evt: MessageEvent): void => {
                sub.next(evt.data);
                if (evt.data.type === SudokuBenchmarkMessageType.RESULT) {
                    worker.terminate();
                    sub.complete();
                }
            };
            worker.postMessage(this.sudokuBoardSize);

            return (): void => {
                worker.terminate();
            };
        });
        obs.subscribe((msg: ISudokuBenchmarkMessage): void => {
            if (msg.type === SudokuBenchmarkMessageType.RESULT) {
                this.zone.run((): void => {
                    this.results.push(msg);
                    this.resultTable.renderRows();
                });
            }
        }, (): void => { }, (): void => {
            this.calculating = false;
        });
    }

    public onSizeSelected(evt: MatSliderChange): void {
        this.sudokuBoardSize = evt.value ** 2;
    }
}
