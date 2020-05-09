/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component';
@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        MatCardModule,
    ],
})
export class HomeModule { }
