/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolveComponent } from './component';

const playRoutes: Routes = [
    {
        component: SolveComponent,
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
export class SolveRoutingModule { }
