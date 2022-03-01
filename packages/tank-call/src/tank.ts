/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Point } from '@pixi/math';

export class Tank extends Container {
    private static readonly TURRET_OFFSET: Point = new Point(0, 10);
    private base: Graphics;
    private turret: Graphics;
    private mTurretAngle = 0;
    public static readonly BARREL_LENGTH: number = 20;

    constructor() {
        super();
        this.base = new Graphics();
        this.turret = new Graphics();
        this.addChild(this.base);
        this.addChild(this.turret);
        this.redraw();
    }

    public set turretAngle(angle: number) {
        this.mTurretAngle = angle;
        this.redraw();
    }

    public get turretAngle(): number {
        return this.mTurretAngle;
    }

    public redraw(): void {
        this.base.clear();
        this.turret.clear();
        this.base.beginFill(0xff3300);
        this.base.moveTo(-20, 0);
        this.base.arc(0, 0, 20, 0, Math.PI);
        this.base.endFill();
        this.turret.lineStyle(3, 0x0033ff);
        this.turret.moveTo(Tank.TURRET_OFFSET.x, Tank.TURRET_OFFSET.y);
        this.turret.lineTo(
            Tank.BARREL_LENGTH * Math.cos(this.turretAngle) + Tank.TURRET_OFFSET.x,
            Tank.BARREL_LENGTH * Math.sin(this.turretAngle) + Tank.TURRET_OFFSET.y
        );
    }
}
