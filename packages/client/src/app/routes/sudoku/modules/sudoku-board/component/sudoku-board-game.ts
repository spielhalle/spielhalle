/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { autoDetectRenderer, Container, Graphics, Renderer, Text, TextStyle } from 'pixi.js';

export class SudokuBoardGame {
    public readonly renderer: Renderer;
    public readonly stage: Container;
    public readonly textLayer: Container;
    private animationFrameId: number;
    public constructor(public rootElement: HTMLCanvasElement,
        debug: boolean = false) {
        this.renderer = autoDetectRenderer({
            transparent: debug,
            view: rootElement,
        });
        this.stage = new Container();
        this.textLayer = new Container();
    }
    public start(): void {
        const grid: Graphics = new Graphics()
            .beginFill(0x00ff00);
        for (let i: number = 1; i < 9; i++) {
            const offset: number = i % 3 === 0 ? 3 : 1;
            grid.drawRect((i * 50) - offset, 0, offset * 2, 9 * 50)
                .drawRect(0, (i * 50) - offset, 9 * 50, offset * 2);
        }
        this.stage.addChild(grid);
        this.stage.addChild(this.textLayer);
        const txtStyle: TextStyle = new TextStyle({
            align: 'center',
            fill: 0xff1010,
            fontFamily: 'Arial',
            fontSize: 24,
        });
        for (let i: number = 0; i < 9 * 9; i++) {
            const text: Text = new Text(`${i}`, txtStyle);
            text.x = 25 + ((i % 9) * 50) - (text.width / 2);
            text.y = 25 + (Math.floor(i / 9) * 50) - (text.height / 2);
            this.textLayer.addChild(text);
        }
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    public updateText(txtItem: Text, x: number, y: number, txt: string): void {
        txtItem.text = txt;
        txtItem.x = 25 + (x * 50) - (txtItem.width / 2);
        txtItem.y = 25 + (y * 50) - (txtItem.height / 2);
    }

    public setBoard(board: number[][]): void {
        let totalIdx: number = 0;
        for (let x: number = 0; x < board.length; x++) {
            for (let y: number = 0; y < board.length; y++) {
                this.updateText(this.textLayer.children[totalIdx] as Text, x, y, `${board[x][y]}`);
                totalIdx++;
            }
        }
    }
    public animate(t: DOMHighResTimeStamp): void {

        // just for fun, let's rotate mr rabbit a little
        // graphic.x += 1;
        // render the stage
        this.renderer.render(this.stage);
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    public stop(): void {
        cancelAnimationFrame(this.animationFrameId);
    }
}
