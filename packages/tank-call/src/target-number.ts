/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Container } from '@pixi/display';
import { Text, TextStyle } from '@pixi/text';

export class TargetNumber extends Container {
    public mNum = 0;
    private text: Text;
    private textStyle: TextStyle = new TextStyle({
        fill: '#0000FF', // gradient
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        stroke: '#4a1850',
        strokeThickness: 1,
    }); /*
    private textStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });*/
    constructor(num: number) {
        super();
        this.mNum = num;
        this.text = new Text(`${num}`, this.textStyle);
        this.addChild(this.text);
        this.centerText();
    }

    private centerText(): void {
        this.pivot.y = this.height;
        this.scale.y = -1;
        this.text.x = this.text.width / -2;
    }

    public set num(num: number) {
        this.mNum = num;
        this.text.text = `${num}`;
        this.centerText();
    }

    public get num(): number {
        return this.mNum;
    }
}
