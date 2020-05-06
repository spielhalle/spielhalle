/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-number-dialog',
    styleUrls: ['./number-dialog.component.scss'],
    templateUrl: './number-dialog.component.html',
})
export class NumberDialogComponent {

    constructor(public dialogRef: MatDialogRef<NumberDialogComponent>) { }

}
