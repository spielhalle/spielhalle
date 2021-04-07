/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class TankCallCanActivateGuard implements CanActivate {
    constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if ('sudokuSize' in route.params) {
            const sudokuSizeParam: string = route.params.sudokuSize;
            const isNumber: boolean = /^[0-9]+$/.test(sudokuSizeParam);
            if (isNumber) {
                const sudokuSize: number = parseInt(sudokuSizeParam, 10);
                const boxSize: number = Math.sqrt(sudokuSize);
                if (sudokuSize >= 2 && sudokuSize <= 36) {
                    if (boxSize === Math.floor(boxSize)) {
                        return true;
                    }
                    return this.router.createUrlTree(['/sudoku', Math.floor(boxSize) ** 2]);
                }
            }
        }
        return this.router.createUrlTree(['/sudoku']);
    }
}
