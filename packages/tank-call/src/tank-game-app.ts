/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Application, IApplicationOptions } from '@pixi/app';
import { BatchRenderer, Renderer } from '@pixi/core';
import { IDestroyOptions } from '@pixi/display';
import { TickerPlugin } from '@pixi/ticker';
import { Input, InputState } from './inputs';
import { TankGame } from './tank-game';

Application.registerPlugin(TickerPlugin);
Renderer.registerPlugin('batch', BatchRenderer);
export class TankGameApp extends Application {
    public static readonly POWER_ACCELERATION = 0.005;
    public static readonly PASSIVE_DECELERATION = 0.95;
    public static readonly STOP_THRESHOLD = 0.0001;
    public readonly tankGame: TankGame;
    private readonly inp: Input;
    private alreadyFired = false;
    private powerVelocity = 0;
    public constructor(opts?: IApplicationOptions) {
        super(opts);
        this.tankGame = new TankGame(this.view.width, this.view.height);
        this.stage.addChild(this.tankGame);
        this.stage.pivot.y = this.view.height;
        this.stage.scale.y = -1;
        this.inp = new Input(this.view);
        this.ticker.add((dt: number): void => {
            const aState: InputState = this.inp.getState('a');
            const dState: InputState = this.inp.getState('d');
            if (aState === InputState.PRESSED) {
                this.powerVelocity -= TankGameApp.POWER_ACCELERATION * dt;
            }
            if (dState === InputState.PRESSED) {
                this.powerVelocity += TankGameApp.POWER_ACCELERATION * dt;
            }
            if (this.powerVelocity !== 0) {
                this.powerVelocity = this.powerVelocity * Math.pow(TankGameApp.PASSIVE_DECELERATION, dt);
                if (
                    this.powerVelocity <= TankGameApp.STOP_THRESHOLD &&
                    this.powerVelocity >= -TankGameApp.STOP_THRESHOLD &&
                    aState !== InputState.PRESSED &&
                    dState !== InputState.PRESSED
                ) {
                    this.powerVelocity = 0;
                }
            }
            /**
             * Fire Projectile
             */
            this.tankGame.addPower(this.powerVelocity * dt);
            if (this.alreadyFired === false && this.inp.getState(' ') === InputState.PRESSED) {
                this.alreadyFired = true;
                this.tankGame.spawnProjectile();
            } else if (this.alreadyFired === true && this.inp.getState(' ') !== InputState.PRESSED) {
                this.alreadyFired = false;
            }
            /**
             * Tank Angle
             */

            const wState: InputState = this.inp.getState('w');
            const sState: InputState = this.inp.getState('s');
            if (wState === InputState.PRESSED && sState !== InputState.PRESSED) {
                this.tankGame.increaseTankAngle((Math.PI / 180.0) * dt);
            } else if (wState !== InputState.PRESSED && sState === InputState.PRESSED) {
                this.tankGame.increaseTankAngle((-Math.PI / 180.0) * dt);
            }
        });
    }

    public destroy(removeView?: boolean, stageOptions?: boolean | IDestroyOptions): void {
        super.destroy(removeView, stageOptions);
        this.inp.destroy();
    }
}
