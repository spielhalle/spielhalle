/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
@Component({
    selector: 'app-tank-call',
    templateUrl: './tank-call-container.component.html',
})
export class TankCallContainerComponent {

    public readonly isBrowser: boolean;
    public constructor(@Inject(PLATFORM_ID) private readonly platformId: string) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
}
