/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home';
import { NotFoundComponent } from './modules/not-found';

const appRoutes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
    {
        // tslint:disable-next-line:typedef
        loadChildren: () => import('./routes/sudoku/sudoku.module').then((m) => m.SudokuModule),
        path: 'sudoku',
    },
    {
        // tslint:disable-next-line:typedef
        loadChildren: () => import('./routes/tank-call/tank-call.module').then((m) => m.TankCallModule),
        path: 'tank-call',
    },
    {
        component: NotFoundComponent,
        path: '**',
    },
];

@NgModule({
    exports: [
        RouterModule,
    ],
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabled',
            relativeLinkResolution: 'legacy',
        }),
    ],
})
export class AppRoutingModule { }
