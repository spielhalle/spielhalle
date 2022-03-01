/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { InjectionToken } from '@angular/core';
import type SudokuMod from '@spielhalle/sudoku-board';

export const SUDOKU_BOARD_TOKEN: InjectionToken<Promise<typeof SudokuMod>>
    = new InjectionToken<Promise<typeof SudokuMod>>('Token providing loader for sudoku-board');
