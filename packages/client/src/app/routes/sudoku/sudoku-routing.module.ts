/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolveComponent } from './components';
import { SudokuBenchmarkComponent } from './modules/sudoku-benchmark';

const playRoutes: Routes = [
    {
        component: SolveComponent,
        path: '',
    },
    {
        component: SudokuBenchmarkComponent,
        path: 'benchmark',
    },
];

@NgModule({
    exports: [
        RouterModule,
    ],
    imports: [
        RouterModule.forChild(playRoutes),
    ],
})
export class SudokuRoutingModule { }
