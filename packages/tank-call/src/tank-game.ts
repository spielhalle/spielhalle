/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Container } from '@pixi/display';
import { InteractionEvent } from '@pixi/interaction';
import { IPointData, Point, Rectangle } from '@pixi/math';
import { Text, TextStyle } from '@pixi/text';
import { Ticker } from '@pixi/ticker';
import { Background } from './background';
import { KeyListener } from './key-listener';
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
    private power = 10;
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

    private init(): void {
        if (this.initiated) {
            throw new Error('Already initiated');
        }
        KeyListener.create(87, undefined, (): void => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        KeyListener.create(87, undefined, (): void => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        KeyListener.create(82, undefined, (): void => {
            this.resetGame();
        });
        KeyListener.create(83, undefined, (): void => {
            this.power = Math.max(0, this.power - 0.1);
            this.updatePowerText();
        });
        this.powerText = new Text('Power: 0', this.powerTextStyle);
        this.powerText.scale.y = -1;
        this.callText = new Text('..', this.callTextStyle);
        this.callText.scale.y = -1;
        this.callText.position.x = this.width / 2;
        // this.callText.position.y = this.height - 60;
        // Invert because double inverted... bs
        this.interactive = true;
        this.on('pointertap', (tap: InteractionEvent): void => {
            this.spawnProjectile();
        });
        this.on('pointermove', (tap: InteractionEvent): void => {
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
        const ticker: Ticker = Ticker.shared;
        ticker.add((deltaT: number): void => {
            for (let i: number = this.projectileContainer.children.length - 1; i >= 0; i--) {
                const pr: Projectile = this.projectileContainer.getChildAt(i) as Projectile;
                pr.step(deltaT);
                if (pr.projectileDestroyed) {
                    // ignore
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
        });
    }

    private gravitateObjects(): void {
        this.tank.y = this.landscape.getHeight(this.tank.x);
        this.levelTank();
        for (let n = 0; n < this.numberContainer.children.length; n++) {
            const num: TargetNumber = this.numberContainer.getChildAt(n) as TargetNumber;
            num.y = this.landscape.getHeight(num.x);
        }
    }

    private resetGame(): void {
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
                    console.log('eq');
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

    private updatePowerText(): void {
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
        const pr: Projectile = new Projectile();
        const pp: Point = this.toLocal(new Point(0, 10), this.tank);
        pr.x = pp.x;
        pr.y = pp.y;
        pr.lastX = this.tank.x;
        pr.lastY = this.tank.y;
        pr.velocity.y = Math.sin(this.tank.rotation + this.tank.turretAngle) * this.power;
        pr.velocity.x = Math.cos(this.tank.rotation + this.tank.turretAngle) * this.power;
        this.projectileContainer.addChild(pr);
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
}
