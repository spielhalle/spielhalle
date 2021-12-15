/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Texture } from '@pixi/core';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';

export class Background extends Container {
    private gradient: Sprite;
    constructor(width: number, height: number) {
        super();
        this.gradient = this.createGradient();
        this.gradient.width = width;
        this.gradient.height = height;
        this.addChild(this.gradient);
    }

    private createGradient(): Sprite {
        const canv: HTMLCanvasElement = document.createElement('canvas');
        canv.width = 100;
        canv.height = 100;
        const ctx: CanvasRenderingContext2D = canv.getContext('2d') as CanvasRenderingContext2D;
        const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, '#81C784');
        gradient.addColorStop(1, '#64B5F6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 100);
        return new Sprite(Texture.from(canv));
    }
}
