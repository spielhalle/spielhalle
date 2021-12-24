/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { Application } from '@pixi/app';
import { AbstractRenderer, autoDetectRenderer, BatchRenderer, Renderer } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { TickerPlugin } from '@pixi/ticker'

Application.registerPlugin(TickerPlugin)
Renderer.registerPlugin('batch', BatchRenderer)
const rootEl: HTMLCanvasElement = document.getElementById('testCanvas') as HTMLCanvasElement;
const renderer: AbstractRenderer = autoDetectRenderer({ view: rootEl });
const sprite: Sprite = Sprite.from('https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Imgur_icon.svg/120px-Imgur_icon.svg.png')

const r = (): void => {
    renderer.render(sprite)
    requestAnimationFrame(r);
}
requestAnimationFrame(r);
