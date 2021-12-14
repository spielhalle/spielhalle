/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TankCallContainerComponent } from './components/tank-call-container';
import { TankCallGameDirective } from './components/tank-call-game';
import { TankCallRoutingModule } from './tank-call-routing.module';
@NgModule({
    declarations: [
        TankCallContainerComponent, TankCallGameDirective,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        TankCallRoutingModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [
    ],
})
export class TankCallModule { }
