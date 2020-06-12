/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatTable } from '@angular/material/table';
import { Observable, Subscriber, Subscription, TeardownLogic } from 'rxjs';
import { SudokuBoardDirective } from '../../sudoku-board/component';
import { SudokuBenchmarkMessage, SudokuBenchmarkMessageType } from './sudoku-benchmark-message';
@Component({
    selector: 'app-sudoku-benchmark',
    styleUrls: ['./sudoku-benchmark.component.scss'],
    templateUrl: './sudoku-benchmark.component.html',
})
export class SudokuBenchmarkComponent implements OnDestroy {

    public calculating: boolean = false;
    public results: any[] = [];
    displayedColumns: string[] = ['boardSize', 'time', 'results'];
    public sudokuBoardSize: number = 9;
    @ViewChild(SudokuBoardDirective)
    public sudokuBoard: SudokuBoardDirective;
    @ViewChild(MatTable)
    public resultTable: MatTable<any>;
    private subscription: Subscription;
    public constructor(public zone: NgZone) {

    }
    public startTest(): void {
        this.calculating = true;
        const obs: Observable<SudokuBenchmarkMessage> = new Observable((sub: Subscriber<SudokuBenchmarkMessage>): TeardownLogic => {
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
        this.subscription = obs.subscribe((msg: SudokuBenchmarkMessage): void => {
            if (msg.type === SudokuBenchmarkMessageType.PROGRESS) {
                this.sudokuBoard.field = msg.board;
                // tslint:disable-next-line:no-console
                console.log(msg.results);
            } else if (msg.type === SudokuBenchmarkMessageType.RESULT) {
                this.zone.run((): void => {
                    this.results.push(msg);
                    this.resultTable.renderRows();
                });
            }
        }, (): void => { }, (): void => {
            this.calculating = false;
        });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onSizeSelected(evt: MatSliderChange): void {
        this.sudokuBoardSize = evt.value ** 2;
    }
}
