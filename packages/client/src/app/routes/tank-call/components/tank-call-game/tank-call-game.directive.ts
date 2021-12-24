/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Directive, ElementRef, Inject, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import type TankCallMod from '@spielhalle/tank-call';
import { AbstractPixiRenderDirective } from 'src/app/components';
import { TANK_CALL_LOADER_TOKEN } from './../../tank-call-loader-token';

@Directive({
    selector: 'canvas[appTankCallGame]',
})
export class TankCallGameDirective extends AbstractPixiRenderDirective<TankCallMod.TankGameApp>{


    public constructor(zone: NgZone,
        el: ElementRef,
        @Inject(PLATFORM_ID) platformId: string,
        @Optional() @Inject(TANK_CALL_LOADER_TOKEN) private tcg: Promise<typeof TankCallMod>) {
        super(zone, el, platformId);
    }

    public async loadGame(): Promise<TankCallMod.TankGameApp> {
        return new (await this.tcg).TankGameApp({
            view: this.el.nativeElement,
        });
    }

}
