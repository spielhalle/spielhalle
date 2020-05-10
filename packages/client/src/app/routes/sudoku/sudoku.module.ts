/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SolveComponent } from './components';
import { SudokuFieldModule } from './modules';
import { SudokuBenchmarkModule } from './modules/sudoku-benchmark';
import { SudokuSolverService } from './services';
import { SudokuCanActivateGuard } from './sudoku-can-activate';
import { SudokuRoutingModule } from './sudoku-routing.module';
@NgModule({
    declarations: [
        SolveComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        SudokuFieldModule,
        SudokuBenchmarkModule,
        SudokuRoutingModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [
        SudokuSolverService,
        SudokuCanActivateGuard,
    ],
})
export class SudokuModule { }
