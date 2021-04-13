/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { autoDetectRenderer, AbstractRenderer } from '@pixi/core';
import { Container } from '@pixi/display';
import { Loader } from '@pixi/loaders';
import { Sprite } from '@pixi/sprite';
import { Ticker } from '@pixi/ticker';
import { TankGame } from '@spielhalle/tank-call';

@Component({
    selector: 'app-tank-call',
    styleUrls: ['./tank-call.component.scss'],
    templateUrl: './tank-call.component.html',
})
export class TankCallComponent implements AfterViewInit {

    public boxSize: number = 3;
    @ViewChild('tankCallCanvas')
    myCanvas: ElementRef<HTMLCanvasElement>;
    constructor(public elRef: ElementRef,
        private zone: NgZone) {


        // The application will create a canvas element for you that you
        // can then insert into the DOM.

    }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular((): void => {
            const ticker: Ticker = Ticker.shared
            ticker.autoStart = false;
            ticker.stop();
            const renderer: AbstractRenderer = autoDetectRenderer({
                backgroundAlpha: 0.5,
                view: this.myCanvas.nativeElement,
                width: 256,         // default: 800
                height: 256,        // default: 600
                antialias: true,    // default: false
                // transparent: environment.production, // default: false
                resolution: 1       // default: 1,
            });
            const tankGame: TankGame = new TankGame(256, 256);
            const stage: Container = new Container();
            stage.addChild(tankGame);
            //app.stage.pivot.y = app.view.height;
            //app.stage.scale.y = -1;
            //as.height = 100;
            //as.width = 100;
            //as.x = 50;
            //as.y = 40;
            //app.render();
            const loader: Loader = new Loader('https://avatars.githubusercontent.com/u/');
            //This `setup` function will run when the image has loaded
            const setup = () => {

                //Create the cat sprite
                let cat = new Sprite(loader.resources["cat"].texture);

                //Add the cat to the stage
                stage.addChild(cat);
            }
            loader
                .add("cat", "695831?s=88&u=6114c2fc6a6b89449c4eb0d13a65b29adfad0e4d&v=4")
                .load(setup);
            renderer.resize(128, 128);
            stage.render(renderer as any);
            /*
                        const fna = (): void => {
                            requestAnimationFrame(fna);
                            renderer.render(stage);
                        }
                        requestAnimationFrame(fna);
                        */
        })
    }


    public onFieldChange(sudokuField: number[][]): void {

    }
}
