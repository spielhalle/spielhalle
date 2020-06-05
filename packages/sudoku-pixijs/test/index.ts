import { SudokuBoardGame } from './../src'

const board: SudokuBoardGame = new SudokuBoardGame(document.getElementById('parentCanvas') as HTMLCanvasElement, true);
board.start();
