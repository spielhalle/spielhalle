/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Graphics } from '@pixi/graphics';
import { rgb2hex } from '@pixi/utils';

export class BarrelExplosion extends Graphics {
    constructor() {
        super();
        this.redraw();
    }
    public static readonly DURATION: number = 10;
    public static readonly MIN_RADIUS: number = 0.05;
    public static readonly MAX_RADIUS: number = 1;
    public static readonly FADE_START: number = 0.6;
    private progress = 0;

    public redraw(progress = 0): void {
        const sineProgress: number = 1 - Math.sin(Math.PI * progress);
        const explosionColor: number = rgb2hex([1, sineProgress, progress < 0.5 ? 0 : sineProgress]);
        const fadeProgress: number = progress >= BarrelExplosion.FADE_START ?
            1 - ((progress - BarrelExplosion.FADE_START) / (1 - BarrelExplosion.FADE_START)) :
            1;
        this.clear();
        this.beginFill(explosionColor, fadeProgress);
        this.moveTo(0, 0);
        this.lineTo(20, 10);
        this.arc(20, 0, 10, Math.PI * 0.5, Math.PI * 1.5, true);
        this.lineTo(0, 0);
        this.endFill();
    }
    public step(delta: number): void {
        this.progress += delta;
        if (this.progress > BarrelExplosion.DURATION) {
            this.parent.removeChild(this);
            return;
        }
        const relativeProgress: number = this.progress / BarrelExplosion.DURATION;
        const relativeProgressSquared: number = relativeProgress * relativeProgress;
        const explosionScale: number = relativeProgressSquared / (2.0 * (relativeProgressSquared - relativeProgress) + 1.0);
        this.scale.set(explosionScale, explosionScale);
        this.redraw(relativeProgress);

    }
}
