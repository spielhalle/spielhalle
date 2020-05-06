/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SudokuComponent } from './component';
import { PlayRoutingModule } from './play-routing.module';
@NgModule({
    declarations: [
        SudokuComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        PlayRoutingModule,
    ],
})
export class PlayModule { }
