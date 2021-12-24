/*
 * Package @spielhalle/sudoku-board
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Text, TextStyle } from '@pixi/text';

export class SudokuBoardGame extends Container {
    public readonly stage: Container;
    public readonly textLayer: Container;
    public readonly gameWidth: number;
    public readonly gameHeight: number;
    constructor(width: number, height: number) {
        super();
        this.stage = new Container();
        this.textLayer = new Container();
        this.gameHeight = height;
        this.gameWidth = width;
        this.init();
    }
    private init(): void {
        const grid: Graphics = new Graphics().beginFill(0x00ff00);
        for (let i = 1; i < 9; i++) {
            const offset: number = i % 3 === 0 ? 3 : 1;
            grid.drawRect(i * 50 - offset, 0, offset * 2, 9 * 50).drawRect(0, i * 50 - offset, 9 * 50, offset * 2);
        }
        this.stage.addChild(grid);
        this.stage.addChild(this.textLayer);
        const txtStyle: TextStyle = new TextStyle({
            align: 'center',
            fill: 0xff1010,
            fontFamily: 'Arial',
            fontSize: 24,
        });
        for (let i = 0; i < 9 * 9; i++) {
            const text: Text = new Text(`${i}`, txtStyle);
            text.x = 25 + (i % 9) * 50 - text.width / 2;
            text.y = 25 + Math.floor(i / 9) * 50 - text.height / 2;
            this.textLayer.addChild(text);
        }
    }

    public updateText(txtItem: Text, x: number, y: number, txt: string): void {
        txtItem.text = txt;
        txtItem.x = 25 + x * 50 - txtItem.width / 2;
        txtItem.y = 25 + y * 50 - txtItem.height / 2;
    }

    public setBoard(board: number[][]): void {
        let totalIdx = 0;
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board.length; y++) {
                this.updateText(this.textLayer.children[totalIdx] as Text, x, y, `${board[x][y]}`);
                totalIdx++;
            }
        }
    }
}
