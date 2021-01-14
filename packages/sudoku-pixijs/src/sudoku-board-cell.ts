/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/sudoku-pixijs
 */

import { Text, TextStyle, Container, RoundedRectangle, Graphics, interaction, Ticker } from 'pixi.js';

export class SudokuBoardCell extends Container {
    private readonly txtStyle: TextStyle = new TextStyle({
        align: 'center',
        fill: 0xff1010,
        fontFamily: 'Arial',
        fontSize: 24,
    });
    private readonly backgroundMask: Graphics = new Graphics()
        .beginFill()
        .drawCircle(0, 0, 300)
        .endFill();
    private readonly txtItem: Text;
    private cellSize: number = 1;
    private backgroundGraphics: Graphics;
    private progress: number = 0;
    public constructor() {
        super();
        this.interactive = true;
        this.buttonMode = true;
        this.backgroundGraphics = new Graphics()
            .beginFill(0x00ff00);
        this.addChild(this.backgroundGraphics);
        this.txtItem = new Text('0', this.txtStyle);
        this.addChild(this.txtItem);
        this.on('tap', this.onClick, this);
        this.on('pointertap', this.onClick, this);
        this.on('pointerdown', this.onClick, this);
        this.on('pointerup', this.onClick, this);
        this.backgroundGraphics.renderable = true;
        this.backgroundGraphics.mask = this.backgroundMask;
        this.addChild(this.backgroundMask);
    }

    public onClick(evt: interaction.InteractionEvent): void {
        console.log('T', evt.type);
        switch (evt.type) {
            case 'pointerdown':
                this.startRipple();
                break;
            case 'pointertap':
                console.log('T', evt.data, evt.target);
                this.startRipple();
                break;
        }
    }

    public anim(t: DOMHighResTimeStamp): void {
        this.progress += t * 16.66;
        if (this.progress > 1000) {
            Ticker.shared.remove(this.anim, this);
        } else {
            const maxRadius: number = this.cellSize / Math.sqrt(2);
            const currentRadius: number = Math.min(maxRadius, maxRadius / 1000 * this.progress);
            const cellCenter: number = this.cellSize / 2;
            this.backgroundGraphics
                .clear()
                .beginFill(0xFFFFFF);
            this.backgroundGraphics
                .drawCircle(cellCenter, cellCenter, currentRadius);
        }
    }

    public startRipple(): void {
        this.progress = 0;
        // this.backgroundGraphics.alpha = 0.2;
        this.backgroundGraphics.renderable = true;
        Ticker.shared.add(this.anim, this);
    }

    public setCellSize(cellSize: number): void {
        this.cellSize = cellSize;
        super.calculateBounds();
        this.hitArea = new RoundedRectangle(0, 0, this.cellSize, this.cellSize, 5);
        this.txtStyle.fontSize = this.cellSize * 0.8;
        this.updateText();
        this.backgroundGraphics.clear();
        this.backgroundGraphics
            .beginFill(Math.floor(Math.random() * 3400000))
            .drawRect(0, 0, cellSize, cellSize);
        this.backgroundMask.clear()
            .beginFill()
            .drawRoundedRect(0, 0, this.cellSize, this.cellSize, this.cellSize / 15);
    }
    public updateText(): void {
        this.txtItem.x = (this.cellSize / 2) - (this.txtItem.width / 2);
        this.txtItem.y = (this.cellSize / 2) - (this.txtItem.height / 2);
    }

    public setCellValue(value: number): void {
        this.txtItem.text = '' + value;
        this.updateText();
    }
    public update(deltaT: number): void {
        console.log("UUU");
    }
}
