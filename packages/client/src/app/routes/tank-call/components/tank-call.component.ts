/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-solve',
    styleUrls: ['./tank-call.component.scss'],
    templateUrl: './tank-call.component.html',
})
export class TankCallComponent {

    public boxSize: number = 3;
    constructor(public activatedRoute: ActivatedRoute) {
        this.activatedRoute
            .params
            .subscribe((params: Params): void => {
                this.boxSize = Math.sqrt(parseInt(params.sudokuSize, 10));
                console.log('new board size', this.boxSize);
            });
    }


    public onFieldChange(sudokuField: number[][]): void {

    }
}
