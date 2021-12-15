/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TankCallContainerComponent } from './components/tank-call-container';

const playRoutes: Routes = [
    {
        component: TankCallContainerComponent,
        path: '',
    },
    {
        path: '**',
        redirectTo: '/tank-call/',
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
export class TankCallRoutingModule { }
