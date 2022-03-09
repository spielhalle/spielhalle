/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { SudokuFieldModule } from '../sudoku-board/sudoku-field.module';
import { SudokuBenchmarkComponent } from './component';
@NgModule({
    declarations: [
        SudokuBenchmarkComponent,
    ],
    exports: [
        SudokuBenchmarkComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSliderModule,
        MatDividerModule,
        MatTableModule,
        SudokuFieldModule,
    ]
})
export class SudokuBenchmarkModule { }
