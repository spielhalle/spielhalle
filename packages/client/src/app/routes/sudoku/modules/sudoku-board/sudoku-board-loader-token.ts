import { InjectionToken } from "@angular/core";
import type SudokuMod from '@spielhalle/sudoku-board';

export const SUDOKU_BOARD_TOKEN = new InjectionToken<Promise<typeof SudokuMod>>('Token providing loader for sudoku-board');
