/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

export class KeyListener {
    private isDown = false;
    private isUp = true;
    press: () => void;
    release: () => void;

    public static create(parent: EventTarget, keyCode: string, down?: () => void, up?: () => void): KeyListener {
        const keyListener: KeyListener = new KeyListener(parent, keyCode);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parent.addEventListener('keydown', keyListener.downHandler.bind(keyListener), false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parent.addEventListener('keyup', keyListener.upHandler.bind(keyListener), false);
        if (down) {
            keyListener.press = down;
        }
        if (up) {
            keyListener.release = up;
        }
        return keyListener;
    }

    private constructor(public readonly eventTarget: EventTarget, public readonly key: string) { }

    private downHandler(event: KeyboardEvent): void {
        console.log(event.key, event.type);
        if (event.key === this.key) {
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    }
    private upHandler(event: KeyboardEvent): void {
        console.log(event.key, event.type);
        if (event.key === this.key) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    }

    public remove() {
        this.eventTarget.removeEventListener('keydown', this.downHandler.bind(this));
        this.eventTarget.removeEventListener('keyup', this.upHandler.bind(this));
    }
}
