
/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

/*
 * Package @spielhalle/tank-call
 * Source https://spielhalle.github.io/spielhalle/
 */

export enum InputState {
    UNKNOWN = 0,
    PRESSED = 1,
    UNPRESSED = 2
}


export class Input {

    private key: { [key: string]: InputState } = {};
    public constructor(public readonly target: EventTarget) {
        target.addEventListener('keyup', this.eventHandler.bind(this));
        target.addEventListener('keydown', this.eventHandler.bind(this));
    }
    public getState(key: string): InputState {
        return this.key[key] || InputState.UNKNOWN;
    }

    private eventHandler(evt: KeyboardEvent): void {
        switch (evt.type) {
            case 'keydown':
                this.key[evt.key] = InputState.PRESSED;
                break;
            case 'keyup':
                this.key[evt.key] = InputState.UNPRESSED;
                break;
        }
    }

    public destroy(): void {
        this.target.removeEventListener('keyup', this.eventHandler.bind(this));
        this.target.removeEventListener('keydown', this.eventHandler.bind(this));
    }

    public toString(): string {
        return JSON.stringify(this.key);
    }
}
