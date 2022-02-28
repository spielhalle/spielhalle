/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

import { TankGameApp } from './tank-game-app';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.

const app: TankGameApp = new TankGameApp({
    view: document.getElementById('testCanvas') as HTMLCanvasElement,
});
console.log(Object.keys(app));


const r = (): void => {

    app.render();
    requestAnimationFrame(r);
}
requestAnimationFrame(r);
