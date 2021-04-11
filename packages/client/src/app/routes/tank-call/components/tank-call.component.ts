/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component, ElementRef } from '@angular/core';
import { Application } from '@pixi/app';
import { TankGame } from '@spielhalle/tank-call';

@Component({
    selector: 'app-tank-call',
    styleUrls: ['./tank-call.component.scss'],
    templateUrl: './tank-call.component.html',
})
export class TankCallComponent {

    public boxSize: number = 3;
    constructor(public elRef: ElementRef) {

        const app: Application = new Application();

        // The application will create a canvas element for you that you
        // can then insert into the DOM.
        elRef.nativeElement.appendChild(app.view);
        // load the texture we need

        const tankGame: TankGame = new TankGame(app.view.width, app.view.height);
        app.stage.addChild(tankGame);
        app.stage.pivot.y = app.view.height;
        app.stage.scale.y = -1;

    }


    public onFieldChange(sudokuField: number[][]): void {

    }
}
