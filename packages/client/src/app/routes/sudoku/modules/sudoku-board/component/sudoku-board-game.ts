/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { autoDetectRenderer, Container, Graphics, Renderer, Text, TextStyle, Ticker } from 'pixi.js';
import { SudokuBoardCell } from './sudoku-board-cell';

export class SudokuBoardGame {
    public readonly renderer: Renderer;
    public readonly stage: Container;
    public readonly textLayer: Container;
    private animationFrameId: number;
    private gridGraphics: Graphics;
    private ticker: Ticker;
    public constructor(public rootElement: HTMLCanvasElement,
        debug: boolean = false) {
        this.ticker = Ticker.shared;
        this.renderer = autoDetectRenderer({
            transparent: debug,
            view: rootElement,
        });
        this.stage = new Container();
        this.textLayer = new Container();
    }
    public start(): void {
        this.gridGraphics = new Graphics()
            .beginFill(0x00ff00);
        for (let i: number = 1; i < 9; i++) {
            const offset: number = i % 3 === 0 ? 3 : 1;
            this.gridGraphics.drawRect((i * 50) - offset, 0, offset * 2, 9 * 50)
                .drawRect(0, (i * 50) - offset, 9 * 50, offset * 2);
        }
        this.stage.addChild(this.gridGraphics);
        this.stage.addChild(this.textLayer);
        for (let i: number = 0; i < 9 * 9; i++) {
            const text: SudokuBoardCell = new SudokuBoardCell();
            text.interactive = true;
            text.buttonMode = true;
            text.x = 25 + ((i % 9) * 50) - (text.width / 2);
            text.y = 25 + (Math.floor(i / 9) * 50) - (text.height / 2);
            this.textLayer.addChild(text);
        }
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    public setSize(width: number, height: number): void {
        this.renderer.resize(width, height);
        this.update();
    }

    public update(): void {
        const smallestSide: number = Math.min(this.renderer.width, this.renderer.height);
        const cellSize: number = smallestSide / 9;
        const offsetX: number = (this.renderer.width - smallestSide) / 2;
        const offsetY: number = (this.renderer.height - smallestSide) / 2;
        this.gridGraphics.position.set(offsetX, offsetY);
        this.textLayer.position.set(offsetX, offsetY);
        this.updateGrid(cellSize);
        this.updateText(cellSize);
    }
    public updateGrid(cellSize: number): void {
        this.gridGraphics.clear();
        this.gridGraphics.beginFill(0x00ff00);
        const cellThinBorder: number = Math.max(0.5, cellSize * 0.025);
        const cellThiccBorder: number = Math.max(1, cellSize * 0.05);
        for (let i: number = 1; i < 9; i++) {
            const offset: number = i % 3 === 0 ? cellThiccBorder : cellThinBorder;
            this.gridGraphics.drawRect((i * cellSize) - offset, 0, offset * 2, 9 * cellSize)
                .drawRect(0, (i * cellSize) - offset, 9 * cellSize, offset * 2);
        }
    }

    public updateText(cellSize: number): void {
        for (let x: number = 0; x < 9; x++) {
            for (let y: number = 0; y < 9; y++) {
                const txtItem: SudokuBoardCell = this.textLayer.children[(x * 9) + y] as SudokuBoardCell;
                txtItem.setCellValue(Math.floor(Math.random() * 9));
                txtItem.x = (x * cellSize);
                txtItem.y = (y * cellSize);
                txtItem.setCellSize(cellSize);
            }
        }
    }

    public setBoard(board: number[][]): void {
        let totalIdx: number = 0;
        for (let x: number = 0; x < board.length; x++) {
            for (let y: number = 0; y < board.length; y++) {
                // this.updateText(this.textLayer.children[totalIdx] as Text, x, y, '' + board[x][y]);
                totalIdx++;
            }
        }
    }
    public animate(t: DOMHighResTimeStamp): void {
        //this.ticker.update(t);
        this.renderer.render(this.stage);
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    public stop(): void {
        cancelAnimationFrame(this.animationFrameId);
    }
}
