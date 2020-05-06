/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './component';
@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
    ],
})
export class NotFoundModule { }
