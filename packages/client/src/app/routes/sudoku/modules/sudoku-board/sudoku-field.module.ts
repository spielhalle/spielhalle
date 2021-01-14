/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SudokuBoardDirective } from './component';
@NgModule({
    declarations: [
        SudokuBoardDirective,
    ],
    entryComponents: [],
    exports: [
        SudokuBoardDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDialogModule,
    ],
})
export class SudokuFieldModule { }
