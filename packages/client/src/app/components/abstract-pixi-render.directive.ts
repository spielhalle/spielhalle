/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, NgZone, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges } from '@angular/core';
import type { Application } from '@pixi/app';



@Directive({})
export abstract class AbstractPixiRenderDirective<STAGE extends Application> implements OnChanges, OnDestroy, AfterViewInit {

    public app: STAGE;
    public constructor(public zone: NgZone,
        protected el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: string) {
    }

    public ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.load().then((): void => {
            console.log('Pixi loaded');
        }).catch(console.error);
    }

    public async asyncZone(): Promise<void> {
        if (!NgZone.isInAngularZone()) {
            return new Promise((resolve: () => void): void => {
                this.zone.runOutsideAngular(resolve);
            });
        }
        return Promise.resolve();
    }
    private async load(): Promise<void> {
        await this.asyncZone();
        this.app = await this.loadGame();
        this.app.resizeTo = this.el.nativeElement;
        this.app.resize();
        this.app.render();
    }

    public abstract loadGame(): Promise<STAGE>;

    public ngOnChanges(changes: SimpleChanges): void {
        if (!isPlatformBrowser(this.platformId) || !this.app) {
            return;
        }
    }

    public ngOnDestroy(): void {
        if (!isPlatformBrowser(this.platformId) || !this.app) {
            return;
        }
        this.app.destroy(true);
    }
}
