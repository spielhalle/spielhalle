/*
 * Package @spielhalle/sudoku-board
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Application, IApplicationOptions } from '@pixi/app';
import { BatchRenderer, Renderer } from '@pixi/core';
import { TickerPlugin } from '@pixi/ticker';
import { SudokuBoardGame } from './sudoku-board';

Application.registerPlugin(TickerPlugin);
Renderer.registerPlugin('batch', BatchRenderer);
export class SudokuBoardGameApp extends Application {
    public readonly board: SudokuBoardGame;
    public constructor(opts?: IApplicationOptions) {
        super(opts);
        console.log(this.view.width, this.view.height);
        this.board = new SudokuBoardGame(this.view.width, this.view.height);
        this.stage.addChild(this.board);
        this.stage.pivot.y = this.view.height;
        this.stage.scale.y = 1;
    }
    public setBoard(board: number[][]): void {
        this.board.setBoard(board);
    }
}
