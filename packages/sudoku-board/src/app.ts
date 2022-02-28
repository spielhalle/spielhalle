/*
 * Package @spielhalle/sudoku-board
 * Source https://spielhalle.github.io/spielhalle/
 */

import { SudokuBoardGameApp } from './sudoku-board-app';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.

const app: SudokuBoardGameApp = new SudokuBoardGameApp({
    view: document.getElementById('testCanvas') as HTMLCanvasElement,
});

const r = (): void => {
    app.render();
    requestAnimationFrame(r);
};
requestAnimationFrame(r);
