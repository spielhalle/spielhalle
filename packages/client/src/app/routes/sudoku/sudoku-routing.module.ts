/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolveComponent } from './components';
import { SudokuBenchmarkComponent } from './modules/sudoku-benchmark';
import { SudokuCanActivateGuard } from './sudoku-can-activate';

const playRoutes: Routes = [
    {
        canActivate: [SudokuCanActivateGuard],
        component: SolveComponent,
        path: '',
    },
    {
        component: SudokuBenchmarkComponent,
        path: 'benchmark',
    },
    {
        canActivate: [SudokuCanActivateGuard],
        component: SolveComponent,
        path: ':sudokuSize',
    },
    {
        path: '**',
        redirectTo: '/sudoku/',
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
