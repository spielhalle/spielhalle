/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Graphics } from '@pixi/graphics';
import { Point } from '@pixi/math';
import '@pixi/math-extras';

export class Projectile extends Graphics {
    constructor() {
        super();
        this.beginFill(0xff0000);
        this.moveTo(-4, 2);
        this.lineTo(2, 2);
        this.lineTo(4, 0);
        this.lineTo(2, -2);
        this.lineTo(-4, -2);
        this.lineTo(-4, 2);
        this.endFill();
    }

    private static readonly GRAVITY: Point = new Point(0, -0.05);
    private static readonly TERMINAL_VELOCITY: number = 100;

    public lastX = 0;
    public lastY = 0;
    public velocity: Point = new Point();
    public projectileDestroyed = false;

    public step(delta: number): void {
        this.velocity.x = Math.min(Projectile.TERMINAL_VELOCITY, this.velocity.x + Projectile.GRAVITY.x * delta);
        this.velocity.y = Math.min(Projectile.TERMINAL_VELOCITY, this.velocity.y + Projectile.GRAVITY.y * delta);
        //const totalVelocity:number=this.velocity.magnitude();
        this.velocity.multiplyScalar(0.95 * delta);
        console.log(Math.sqrt((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y)), this.velocity.normalize().magnitude())
        this.lastX = this.x;
        this.lastY = this.y;
        this.x = this.x + delta * this.velocity.x;
        this.y = this.y + delta * this.velocity.y;
        if (this.velocity.x === 0) {
            this.rotation = this.velocity.y >= 0 ? 0 : Math.PI;
        } else {
            this.rotation = Math.atan(this.velocity.y / this.velocity.x);
        }
    }
}
