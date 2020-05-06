/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudokuComponent } from './component/sudoku.component';

const playRoutes: Routes = [
    {
        component: SudokuComponent,
        path: '',
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
export class PlayRoutingModule { }
