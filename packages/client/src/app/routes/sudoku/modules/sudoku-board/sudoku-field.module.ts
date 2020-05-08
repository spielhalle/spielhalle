/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SudokuFieldComponent } from './component';
import { NumberDialogComponent } from './component/number-dialog.component';
@NgModule({
    declarations: [
        SudokuFieldComponent,
        NumberDialogComponent,
    ],
    entryComponents: [
        NumberDialogComponent,
    ],
    exports: [
        SudokuFieldComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDialogModule,
    ],
})
export class SudokuFieldModule { }
