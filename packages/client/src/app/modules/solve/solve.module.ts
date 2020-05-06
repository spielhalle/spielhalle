/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SudokuFieldModule } from '../sudoku-field';
import { SolveComponent } from './component';
import { SolveRoutingModule } from './solve-routing.module';
@NgModule({
    declarations: [
        SolveComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        SudokuFieldModule,
        SolveRoutingModule,
        MatToolbarModule,
        MatIconModule,
    ],
})
export class SolveModule { }
