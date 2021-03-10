import {
    Tank
} from "./tank";
import {
    Landscape
} from "./landscape";
import {
    TargetNumber
} from "./target-number";
import {
    Background
} from "./background";
import {
    Projectile
} from "./projectile";
import { Container } from "@pixi/display";
import { Text, TextStyle } from "@pixi/text";
import { Point, Rectangle } from "@pixi/math";
import { Ticker } from "@pixi/ticker";
import { InteractionEvent } from "@pixi/interaction";

class KeyListener {
    private isDown: boolean = false;
    private isUp: boolean = true;
    public readonly code: number;

    private constructor(code: number) {
        this.code = code;
    }
    private downHandler(event) {
        if (event.keyCode === this.code) {
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    };
    private upHandler = function (event) {
        if (event.keyCode === this.code) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    };

    public static create(keyCode: number, down: Function = null, up: Function = null): KeyListener {
        let keyListener: KeyListener = new KeyListener(keyCode);
        window.addEventListener(
            "keydown", keyListener.downHandler.bind(keyListener), false
        );
        window.addEventListener(
            "keyup", keyListener.upHandler.bind(keyListener), false
        );
        keyListener.press = down;
        keyListener.release = up;
        return keyListener;
    }
    press: Function;
    release: Function;
}


export class TankGame extends Container {

    private background: Background;
    private landscape: Landscape;
    private tank: Tank;
    private gameWidth: number;
    private gameHeight: number;
    private initiated: boolean;
    private projectileContainer: Container = new Container();
    private numberContainer: Container = new Container();
    private powerUpListener: KeyListener;
    private powerDownListener: KeyListener;
    private powerText: Text;
    private callText: Text;
    private callTextStyle = new TextStyle({
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
    });
    private power: number = 10;
    private powerTextStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: "#FFFFFF", // gradient
        stroke: '#000000',
        strokeThickness: 2
    });
    constructor(width: number, height: number) {
        super();
        this.gameHeight = height;
        this.gameWidth = width;
        this.init();
    }

    private init(): void {
        if (this.initiated === true) {
            throw new Error("Already initiated");
        }
        this.powerUpListener == KeyListener.create(87, null, () => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        this.powerUpListener == KeyListener.create(87, null, () => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        this.powerUpListener == KeyListener.create(82, null, () => {
            this.resetGame();
        });
        this.powerDownListener == KeyListener.create(83, null, () => {
            this.power = Math.max(0, this.power - 0.1);
            this.updatePowerText();
        });
        this.powerText = new Text("Power: " + 0, this.powerTextStyle);
        this.powerText.scale.y = -1;
        this.callText = new Text("..", this.callTextStyle);
        this.callText.scale.y = -1;
        this.callText.position.x = this.width / 2;
        //this.callText.position.y = this.height - 60;
        //Invert because double inverted... bs
        this.interactive = true;
        (this as any).on("pointertap", (tap: InteractionEvent) => {
            this.spawnProjectile();
        });
        (this as any).on("pointermove", (tap: InteractionEvent) => {
            let p: Point = tap.data.getLocalPosition(this);
            let dX: number = p.x - this.tank.x;
            let dY: number = p.y - this.tank.y;
            let rot: number = Math.atan2(dY, dX);

            //correct turret rot
            rot = rot - this.tank.rotation;// + (dX < 0 ? Math.PI : 0);
            this.tank.turretAngle = rot;
            //console.log(rot);
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
        let ticker = Ticker.shared;
        ticker.add(deltaT => {
            for (let i = this.projectileContainer.children.length - 1; i >= 0; i--) {
                let pr: Projectile = <Projectile>this.projectileContainer.getChildAt(i);
                pr.step(deltaT);
                if (pr.destroyed) {

                } else if (pr.y < this.landscape.getHeight(pr.x)) {
                    pr.destroyed = true;
                    this.landscape.explodeAt(pr.x);
                    this.projectileContainer.removeChild(pr).destroy();
                    this.gravitateObjects();
                } else if (pr.x < -20 || pr.x + 20 > this.width) {
                    pr.destroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                } else if (pr.y < -20) {
                    pr.destroyed = true;
                    this.projectileContainer.removeChild(pr).destroy();
                } else {
                    for (let n: number = 0; n < this.numberContainer.children.length; n++) {
                        let num: TargetNumber = <TargetNumber>this.numberContainer.getChildAt(n);
                        let ba: Rectangle = num.getLocalBounds();
                        if (this.lineIntersect(pr.x, pr.y, pr.lastX, pr.lastY, num.x + ba.left, num.y + ba.top, num.x + ba.left, num.y + ba.bottom)) {
                            pr.destroyed = true;
                            this.projectileContainer.removeChild(pr).destroy();
                            console.log("hit", num.num);
                            this.callNumber += num.num;
                            this.updateCallText();
                            this.relocateNumber(num);
                            break;
                        } else if (this.lineIntersect(pr.x, pr.y, pr.lastX, pr.lastY, num.x + ba.left, num.y + ba.top, num.x + ba.right, num.y + ba.top)) {
                            pr.destroyed = true;
                            this.projectileContainer.removeChild(pr).destroy();
                            console.log("hit", num.num);
                            this.callNumber += num.num;
                            this.updateCallText();
                            this.relocateNumber(num);
                            break;
                        } else if (this.lineIntersect(pr.x, pr.y, pr.lastX, pr.lastY, num.x + ba.right, num.y + ba.top, num.x + ba.right, num.y + ba.bottom)) {
                            pr.destroyed = true;
                            this.projectileContainer.removeChild(pr).destroy();
                            console.log("hit", num.num);
                            this.callNumber += num.num;
                            this.updateCallText();
                            this.relocateNumber(num);
                            break;
                        } else if (this.lineIntersect(pr.x, pr.y, pr.lastX, pr.lastY, num.x + ba.left, num.y + ba.bottom, num.x + ba.right, num.y + ba.bottom)) {
                            pr.destroyed = true;
                            this.projectileContainer.removeChild(pr).destroy();
                            console.log("hit", num.num);
                            this.callNumber += num.num;
                            this.updateCallText();
                            this.relocateNumber(num);
                            break;
                        }
                    }
                }
            }
            //console.log(this.tank.rotation);
        });
        console.log(this.lineIntersect(0, 0, 1, 1, 0, 1, 1, 0));
        //ticker.speed = 0.1;
    }

    private gravitateObjects(): void {
        this.tank.y = this.landscape.getHeight(this.tank.x);
        this.levelTank();
        for (let n: number = 0; n < this.numberContainer.children.length; n++) {
            let num: TargetNumber = <TargetNumber>this.numberContainer.getChildAt(n);
            num.y = this.landscape.getHeight(num.x);
        }
    }

    private resetGame() {
        this.callNumber = "";
        this.updateCallText();
        for (let n = this.projectileContainer.children.length - 1; n >= 0; n--) {
            this.projectileContainer.removeChildAt(n).destroy();
        }
        this.landscape.regenerate();
        this.randomizeTankPosition();
        for (let n: number = 0; n < this.numberContainer.children.length; n++) {
            let num: TargetNumber = <TargetNumber>this.numberContainer.getChildAt(n);
            this.relocateNumber(num);
        }
    }

    private relocateNumber(d: TargetNumber) {
        let t = false;
        do {
            t = false;
            d.x = Math.round(Math.random() * this.gameWidth);
            for (let i = 0; i < this.numberContainer.children.length; i++) {
                if (this.numberContainer.getChildAt(i) === d) {
                    console.log("eq");
                    continue;
                } else if (Math.abs(d.x - this.numberContainer.getChildAt(i).x) < 15) {
                    t = true;
                }
            }
        } while (Math.abs(this.tank.x - d.x) < 40 || t == true)
        d.y = this.landscape.getHeight(d.x);
    }

    private lineIntersect(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {

        var s1_x, s1_y, s2_x, s2_y;
        s1_x = p1_x - p0_x;
        s1_y = p1_y - p0_y;
        s2_x = p3_x - p2_x;
        s2_y = p3_y - p2_y;

        var s, t;
        s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

        return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
    }

    private updatePowerText(): void {
        this.powerText.text = "Power: " + this.power;
        this.powerText.pivot.y = this.powerText.height;
    }

    private callNumber: string = "";

    private updateCallText(): void {
        this.callText.text = this.callNumber == "" ? "..." : this.callNumber;
        this.callText.pivot.y = this.callText.height;
        this.callText.position.x = (this.width - this.callText.width) / 2;
        this.callText.position.y = this.height - 150;
    }

    public spawnProjectile() {
        let pr: Projectile = new Projectile();
        let pp = this.toLocal(new Point(0, 10), this.tank);
        pr.x = pp.x;
        pr.y = pp.y;
        pr.lastX = this.tank.x;
        pr.lastY = this.tank.y;
        pr.velocity.y = Math.sin(this.tank.rotation + this.tank.turretAngle) * this.power;
        pr.velocity.x = Math.cos(this.tank.rotation + this.tank.turretAngle) * this.power;
        this.projectileContainer.addChild(pr);
    }

    public spawnTargetNumber(num: number = 0): TargetNumber {
        let target: TargetNumber = new TargetNumber(num);
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
        let angleSmooth: number = 5;
        let pL: Point = new Point();
        let pR: Point = new Point();
        pL.x = Math.max(0, this.tank.x - angleSmooth);
        pR.x = Math.min(this.gameWidth - 1, this.tank.x + angleSmooth);
        pL.y = this.landscape.getHeight(pL.x);
        pR.y = this.landscape.getHeight(pR.x);
        this.tank.rotation = Math.tanh((pR.y - pL.y) / (pR.x - pL.x));
    }



}
