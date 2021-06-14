/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TankCallComponent } from './components';
import { TankCallCanActivateGuard } from './tank-call-can-activate';

const playRoutes: Routes = [
    {
        component: TankCallComponent,
        path: '',
    },
    {
        canActivate: [TankCallCanActivateGuard],
        component: TankCallComponent,
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
