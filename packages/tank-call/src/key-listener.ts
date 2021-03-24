/*!
 * Source https://github.com/spielhalle/spielhalle Package: tank-call
 */

export class KeyListener {
    private isDown: boolean = false;
    private isUp: boolean = true;
    public readonly code: number;
    press: () => void;
    release: () => void;

    public static create(keyCode: number, down?: () => void, up?: () => void): KeyListener {
        const keyListener: KeyListener = new KeyListener(keyCode);
        window.addEventListener('keydown', keyListener.downHandler.bind(keyListener), false);
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
