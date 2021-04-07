/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TankCallComponent } from './components';
import { TankCallCanActivateGuard } from './tank-call-can-activate';
import { SudokuRoutingModule } from './tank-call-routing.module';
@NgModule({
    declarations: [
        TankCallComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        SudokuRoutingModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [
        TankCallCanActivateGuard,
    ],
})
export class TankCallModule { }
