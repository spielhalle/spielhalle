import { InjectionToken } from "@angular/core";
import type TankCallMod from '@spielhalle/tank-call';

export const TANK_CALL_LOADER_TOKEN = new InjectionToken<Promise<typeof TankCallMod>>('Token providing loader for tank-call');
