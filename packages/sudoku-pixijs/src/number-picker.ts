import { Container } from "pixi.js";

export class NumberPicker extends Container {
    public constructor(public readonly numbers: number = 9) {
        super();
        this.width = 100;
        this.height = 100;

    }
}
