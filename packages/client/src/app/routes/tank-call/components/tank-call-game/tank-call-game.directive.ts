/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { TankGame } from '@spielhalle/tank-call';
import { Application } from '@pixi/app';
@Directive({
    selector: 'canvas[appTankCallGame]',
})
export class TankCallGameDirective implements OnChanges, OnDestroy, OnInit {

    public constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {

    }

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const app: Application = new Application({ view: this.el.nativeElement });
        const tankGame: TankGame = new TankGame(app.view.width, app.view.height);
        app.stage.addChild(tankGame);
        app.stage.pivot.y = app.view.height;
        app.stage.scale.y = -1;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
    }

    public ngOnDestroy(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
    }
}
