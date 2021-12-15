/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

export class KeyListener {
    private isDown = false;
    private isUp = true;
    public readonly code: number;
    press: () => void;
    release: () => void;

    public static create(keyCode: number, down?: () => void, up?: () => void): KeyListener {
        const keyListener: KeyListener = new KeyListener(keyCode);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        window.addEventListener('keydown', keyListener.downHandler.bind(keyListener), false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        window.addEventListener('keyup', keyListener.upHandler.bind(keyListener), false);
        if (down) {
            keyListener.press = down;
        }
        if (up) {
            keyListener.release = up;
        }
        return keyListener;
    }

    private constructor(code: number) {
        this.code = code;
    }

    private downHandler(event: KeyboardEvent): void {
        if (event.keyCode === this.code) {
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    }
    private upHandler(event: KeyboardEvent): void {
        if (event.keyCode === this.code) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    }
}
