/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Container, DisplayObject } from '@pixi/display';
import { InteractionEvent } from '@pixi/interaction';
import { IPointData, Point, Rectangle } from '@pixi/math';
import { Text, TextStyle } from '@pixi/text';
import { Ticker } from '@pixi/ticker';
import { EventEmitter } from '@pixi/utils';
import { Background } from './background';
import { BarrelExplosion } from './barrel-explosion';
import { Landscape } from './landscape';
import { Projectile } from './projectile';
import { Tank } from './tank';
import { TargetNumber } from './target-number';

export class TankGame extends Container {
    private callNumber = '';
    private background: Background;
    private landscape: Landscape;
    private tank: Tank;
    private gameWidth: number;
    private gameHeight: number;
    private initiated: boolean;
    private projectileContainer: Container = new Container();
    private numberContainer: Container = new Container();
    private animatedObjects: Container = new Container();
    public static readonly DELTA_SUB_STEPS: number = 10;
    private powerText: Text;
    private callText: Text;
    private callTextStyle: TextStyle = new TextStyle({
        dropShadow: true,
        dropShadowAngle: Math.PI / 6,
        dropShadowBlur: 4,
        dropShadowColor: '#000000',
        dropShadowDistance: 6,
        fill: ['#ffffff', '#00ff99'], // gradient
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        stroke: '#4a1850',
        strokeThickness: 5,
    });
    private power = 5;
    private powerTextStyle: TextStyle = new TextStyle({
        fill: '#FFFFFF', // gradient
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        stroke: '#000000',
        strokeThickness: 2,
    });
    constructor(width: number, height: number) {
        super();
        this.gameHeight = height;
        this.gameWidth = width;
        this.init();
    }

    public addPower(p: number): void {
        this.power = Math.max(0, this.power + p);
        this.updatePowerText();
    }

    private init(): void {
        if (this.initiated) {
            throw new Error('Already initiated');
        }
        this.powerText = new Text('Power: 0', this.powerTextStyle);
        this.powerText.scale.y = -1;
        this.callText = new Text('..', this.callTextStyle);
        this.callText.scale.y = -1;
        this.callText.position.x = this.width / 2;
        // this.callText.position.y = this.height - 60;
        // Invert because double inverted... bs
        (this as DisplayObject).interactive = true;
        (this as EventEmitter).on('pointertap', (tap: InteractionEvent): void => {
            this.spawnProjectile();
        });
        (this as EventEmitter).on('pointermove', (tap: InteractionEvent): void => {
            const p: IPointData = tap.data.getLocalPosition(this);
            const dX: number = p.x - this.tank.x;
            const dY: number = p.y - this.tank.y;
            let rot: number = Math.atan2(dY, dX);

            rot = rot - this.tank.rotation;
            this.tank.turretAngle = rot;
        });
        this.background = new Background(this.gameWidth, this.gameHeight);
        this.background.x = 0;
        this.background.y = 0;
        this.addChild(this.background);
        this.landscape = new Landscape(this.gameWidth, this.gameHeight * 0.6, 20, Math.floor(this.gameWidth / 100));
        this.addChild(this.landscape);
        this.tank = new Tank();
        this.addChild(this.projectileContainer);
        this.addChild(this.tank);
        this.addChild(this.numberContainer);
        this.randomizeTankPosition();
        this.addChild(this.powerText);
        this.addChild(this.callText);
        this.updatePowerText();
        this.updateCallText();
        this.initiated = true;
        for (let i = 0; i < 9; i++) {
            this.spawnTargetNumber(i);
        }
        this.addChild(this.animatedObjects);
        const ticker: Ticker = Ticker.shared;
        ticker.add((deltaT: number): void => {
            ///console.log(deltaT / (settings.TARGET_FPMS || 1))
            for (let i: number = this.animatedObjects.children.length - 1; i >= 0; i--) {
                const animObj: BarrelExplosion = this.animatedObjects.getChildAt(i) as BarrelExplosion;
                animObj.step(deltaT);
            }

            for (let deltaSubStep = 1; deltaSubStep <= TankGame.DELTA_SUB_STEPS; deltaSubStep++) {
                const deltaS: number = (deltaT / TankGame.DELTA_SUB_STEPS) * deltaSubStep;
                for (let i: number = this.projectileContainer.children.length - 1; i >= 0; i--) {
                    const pr: Projectile = this.projectileContainer.getChildAt(i) as Projectile;
                    if (pr.destroyed || pr.projectileDestroyed) {
                        break;
                    }

                    pr.step(deltaS);
                    this.handleProjectileStep(pr);
                }
            }
        });
    }

    private handleProjectileStep(pr: Projectile) {
        if (pr.projectileDestroyed) {
            return;
        } else if (pr.y < this.landscape.getHeight(pr.x)) {
            pr.projectileDestroyed = true;
            this.landscape.explodeAt(pr.x);
            this.projectileContainer.removeChild(pr).destroy();
            this.gravitateObjects();
        } else if (pr.x < -20 || pr.x + 20 > this.width) {
            pr.projectileDestroyed = true;
            this.projectileContainer.removeChild(pr).destroy();
        } else if (pr.y < -20) {
            pr.projectileDestroyed = true;
            this.projectileContainer.removeChild(pr).destroy();
        } else {
            for (let n = 0; n < this.numberContainer.children.length; n++) {
                const num: TargetNumber = this.numberContainer.getChildAt(n) as TargetNumber;
                const ba: Rectangle = num.getLocalBounds();
                if (
                    this.lineIntersect(
                        pr,
                        { x: pr.lastX, y: pr.lastY },
                        { x: num.x + ba.left, y: num.y + ba.top },
                        { x: num.x + ba.left, y: num.y + ba.bottom }
                    )
                ) {
                    pr.projectileDestroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                    console.log('hit', num.num);
                    this.callNumber += num.num;
                    this.updateCallText();
                    this.relocateNumber(num);
                    break;
                } else if (
                    this.lineIntersect(
                        pr,
                        { x: pr.lastX, y: pr.lastY },
                        { x: num.x + ba.left, y: num.y + ba.top },
                        { x: num.x + ba.right, y: num.y + ba.top }
                    )
                ) {
                    pr.projectileDestroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                    console.log('hit', num.num);
                    this.callNumber += num.num;
                    this.updateCallText();
                    this.relocateNumber(num);
                    break;
                } else if (
                    this.lineIntersect(
                        pr,
                        { x: pr.lastX, y: pr.lastY },
                        { x: num.x + ba.right, y: num.y + ba.top },
                        { x: num.x + ba.right, y: num.y + ba.bottom }
                    )
                ) {
                    pr.projectileDestroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                    console.log('hit', num.num);
                    this.callNumber += num.num;
                    this.updateCallText();
                    this.relocateNumber(num);
                    break;
                } else if (
                    this.lineIntersect(
                        pr,
                        { x: pr.lastX, y: pr.lastY },
                        { x: num.x + ba.left, y: num.y + ba.bottom },
                        { x: num.x + ba.right, y: num.y + ba.bottom }
                    )
                ) {
                    pr.projectileDestroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                    console.log('hit', num.num);
                    this.callNumber += num.num;
                    this.updateCallText();
                    this.relocateNumber(num);
                    break;
                }
            }
        }
    }

    private gravitateObjects(): void {
        this.tank.y = this.landscape.getHeight(this.tank.x);
        this.levelTank();
        for (let n = 0; n < this.numberContainer.children.length; n++) {
            const num: TargetNumber = this.numberContainer.getChildAt(n) as TargetNumber;
            num.y = this.landscape.getHeight(num.x);
        }
    }

    public resetGame(): void {
        this.callNumber = '';
        this.updateCallText();
        for (let n: number = this.projectileContainer.children.length - 1; n >= 0; n--) {
            this.projectileContainer.removeChildAt(n).destroy();
        }
        this.landscape.regenerate();
        this.randomizeTankPosition();
        for (let n = 0; n < this.numberContainer.children.length; n++) {
            const num: TargetNumber = this.numberContainer.getChildAt(n) as TargetNumber;
            this.relocateNumber(num);
        }
    }

    private relocateNumber(d: TargetNumber): void {
        let t = false;
        do {
            t = false;
            d.x = Math.round(Math.random() * this.gameWidth);
            for (let i = 0; i < this.numberContainer.children.length; i++) {
                if (this.numberContainer.getChildAt(i) === d) {
                    continue;
                } else if (Math.abs(d.x - this.numberContainer.getChildAt(i).x) < 15) {
                    t = true;
                }
            }
        } while (Math.abs(this.tank.x - d.x) < 40 || t);
        d.y = this.landscape.getHeight(d.x);
    }

    private lineIntersect(p0: IPointData, p1: IPointData, p2: IPointData, p3: IPointData): boolean {
        const s1X: number = p1.x - p0.x;
        const s1Y: number = p1.y - p0.y;
        const s2X: number = p3.x - p2.x;
        const s2Y: number = p3.y - p2.y;

        const s: number = (-s1Y * (p0.x - p2.x) + s1X * (p0.y - p2.y)) / (-s2X * s1Y + s1X * s2Y);
        const t: number = (s2X * (p0.y - p2.y) - s2Y * (p0.x - p2.x)) / (-s2X * s1Y + s1X * s2Y);

        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }

    public updatePowerText(): void {
        this.powerText.text = `Power: ${this.power}`;
        this.powerText.pivot.y = this.powerText.height;
    }

    private updateCallText(): void {
        this.callText.text = this.callNumber === '' ? '...' : this.callNumber;
        this.callText.pivot.y = this.callText.height;
        this.callText.position.x = (this.width - this.callText.width) / 2;
        this.callText.position.y = this.height - 150;
    }

    public spawnProjectile(): void {
        const absoluteBarrelAngle: number = this.tank.rotation + this.tank.turretAngle;
        const pr: Projectile = new Projectile();
        const barrelStart: Point = this.toLocal(new Point(0, 10), this.tank);
        // Place at Barrel end
        barrelStart.x += Tank.BARREL_LENGTH * Math.cos(absoluteBarrelAngle);
        barrelStart.y += Tank.BARREL_LENGTH * Math.sin(absoluteBarrelAngle);
        pr.x = barrelStart.x;
        pr.y = barrelStart.y;
        pr.lastX = this.tank.x;
        pr.lastY = this.tank.y;
        pr.velocity.y = Math.sin(absoluteBarrelAngle) * this.power;
        pr.velocity.x = Math.cos(absoluteBarrelAngle) * this.power;
        console.log(pr.velocity);
        this.projectileContainer.addChild(pr);
        // Spawn explosion
        const exp: BarrelExplosion = new BarrelExplosion();
        exp.rotation = absoluteBarrelAngle;
        exp.position.set(pr.x, pr.y);
        this.animatedObjects.addChild(exp);
    }

    public spawnTargetNumber(num = 0): TargetNumber {
        const target: TargetNumber = new TargetNumber(num);
        this.relocateNumber(target);
        this.numberContainer.addChild(target);
        return target;
    }

    private randomizeTankPosition(): void {
        // RANDOMIZES THE COORDINATES
        this.tank.x = Math.round(Math.random() * this.gameWidth);
        this.tank.y = this.landscape.getHeight(this.tank.x);
        this.levelTank();
    }

    private levelTank(): void {
        // ALIGNS THE TANK WITH THE FLOOR
        const angleSmooth = 5;
        const pL: Point = new Point();
        const pR: Point = new Point();
        pL.x = Math.max(0, this.tank.x - angleSmooth);
        pR.x = Math.min(this.gameWidth - 1, this.tank.x + angleSmooth);
        pL.y = this.landscape.getHeight(pL.x);
        pR.y = this.landscape.getHeight(pR.x);
        this.tank.rotation = Math.tanh((pR.y - pL.y) / (pR.x - pL.x));
    }

    public increaseTankAngle(p: number): void {
        this.tank.turretAngle += p;
    }
}
