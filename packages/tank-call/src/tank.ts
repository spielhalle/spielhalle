import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Point } from "@pixi/math";

export class Tank extends Container {
    private base: Graphics;
    private turret: Graphics;
    private _turretAngle: number = 0;
    private static readonly TURRET_OFFSET: Point = new Point(0, 10);
    constructor() {
        super();
        this.base = new Graphics();
        this.turret = new Graphics();
        this.addChild(this.base);
        this.addChild(this.turret);
        this.redraw();
    }

    public redraw(): void {
        this.base.clear();
        this.turret.clear();
        this.base.beginFill(0xFF3300);
        this.base.moveTo(-20, 0);
        this.base.arc(0, 0, 20, 0, Math.PI);
        this.base.endFill();
        this.turret.lineStyle(3, 0x0033FF);
        this.turret.moveTo(Tank.TURRET_OFFSET.x, Tank.TURRET_OFFSET.y);
        this.turret.lineTo(20 * Math.cos(this.turretAngle) + Tank.TURRET_OFFSET.x, 20 * Math.sin(this.turretAngle) + Tank.TURRET_OFFSET.y);
    }

    public set turretAngle(angle: number) {
        this._turretAngle = angle;
        this.redraw();
    }

    public get turretAngle(): number {
        return this._turretAngle;
    }
}
