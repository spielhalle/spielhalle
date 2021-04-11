/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component } from '@angular/core';

interface IGameRoute {
    path: string[];
    title: string;
}
@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    public items: IGameRoute[] = [{
        path: ['tank-call'],
        title: 'Tank Call',
    }, {
        path: ['sudoku'],
        title: 'Sudoku',
    }];
}
