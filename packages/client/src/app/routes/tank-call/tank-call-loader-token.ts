/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { InjectionToken } from '@angular/core';
import type TankCallMod from '@spielhalle/tank-call';

export const TANK_CALL_LOADER_TOKEN: InjectionToken<Promise<typeof TankCallMod>>
    = new InjectionToken<Promise<typeof TankCallMod>>('Token providing loader for tank-call');
