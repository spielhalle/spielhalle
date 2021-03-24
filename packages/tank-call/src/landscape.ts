/*!
 * Source https://github.com/spielhalle/spielhalle Package: tank-call
 */

import { Graphics } from '@pixi/graphics';
import { IPointData } from '@pixi/math';

export class Landscape extends Graphics {
    private data: number[] = [];
    private sourceData: number[];
    private mHillHeight: number;
    private mHillOffset: number;
    private mHillWidth: number;
    private mOctaves: number;
    private static bezier(p0: IPointData, p1: IPointData, p2: IPointData, p3: IPointData, t: number): IPointData {
        return {
            x: (Math.pow(1 - t, 3) * p0.x) +
                (3 * t * Math.pow(1 - t, 2) * p1.x) +
                (3 * Math.pow(t, 2) * (1 - t) * p2.x) +
                (Math.pow(t, 3) * p3.x),
            y: (Math.pow(1 - t, 3) * p0.y) +
                (3 * t * Math.pow(1 - t, 2) * p1.y) +
                (3 * Math.pow(t, 2) * (1 - t) * p2.y) +
                (Math.pow(t, 3) * p3.y),
        };
    }
    private static generate(width: number, ocataves: number = 6): number[] {
        if (width % 1 !== 0) {
            throw new Error('Only integers as width allowed');
        }
        if (ocataves % 1 !== 0) {
            throw new Error('Only integers as octaves allowed');
        }
        const res: number[] = [];
        const stepWidth: number = Math.ceil(width / ocataves);
        for (let i: number = 0; i <= ocataves; i++) {
            res[i * stepWidth] = Math.random();
            if (i > 0) {
                Landscape.fillBezier(res, (i - 1) * stepWidth, i * stepWidth);
            }
        }
        return res;
    }

    private static fillBezier(data: number[], idxL: number, idxR: number): void {
        const dX: number = idxR - idxL;
        const idxC: number = (idxR + idxL) / 2;
        const p0: IPointData = {
            x: idxL,
            y: data[idxL],
        };
        const p3: IPointData = {
            x: idxR,
            y: data[idxR],
        };
        const p1: IPointData = {
            x: idxC,
            y: data[idxL],
        };
        const p2: IPointData = {
            x: idxC,
            y: data[idxR],
        };
        for (let i: number = 0; i < dX; i++) {
            data[idxL + i] = Landscape.bezier(p0, p1, p2, p3, i / dX).y;
        }
    }
    public constructor(hillWidth: number, hillHeight: number, hillOffset: number, octaves: number) {
        super();
        if (hillHeight <= 0) {
            throw new Error('hillHeight must larger than 0');
        }
        if (hillWidth <= 0) {
            throw new Error('hillWidth must larger than 0');
        }
        this.mHillHeight = hillHeight;
        this.mHillOffset = hillOffset;
        this.mHillWidth = hillWidth;
        this.mOctaves = octaves;
        this.regenerate();
    }

    public explodeAt(x: number, radius: number = 10): void {
        const roundedX: number = Math.round(x);
        const startHeight: number = this.getHeight(roundedX);
        for (let i: number = roundedX - radius; i <= radius + roundedX; i++) {
            const dX: number = i - roundedX;
            this.data[i] = Math.min(this.data[i], startHeight - Math.sin(Math.acos(dX / radius)) * radius);
            if (this.data[i] <= 0) {
                this.data[i] = 1;
            }
        }
        this.redraw();
    }

    public getHeight(x: number): number {
        return this.data[Math.trunc(x)];
    }

    public set hillHeight(height: number) {
        this.mHillHeight = height;
        this.redraw();
    }

    public get hillHeight(): number {
        return this.mHillHeight;
    }

    public set hillWidth(width: number) {
        this.mHillWidth = width;
        this.regenerate();
    }

    public get hillWidth(): number {
        return this.mHillWidth;
    }

    public set hillOffset(offset: number) {
        this.mHillOffset = offset;
        this.redraw();
    }

    public get hillOffset(): number {
        return this.mHillOffset;
    }
    public set octaves(octaves: number) {
        this.mOctaves = octaves;
        this.regenerate();
    }

    public get octaves(): number {
        return this.mOctaves;
    }

    public regenerate(): void {
        this.sourceData = Landscape.generate(this.mHillWidth, this.mOctaves);
        for (let x: number = 0; x < this.sourceData.length; x++) {
            this.data[x] = this.mHillOffset + (this.sourceData[x] * this.mHillHeight);
        }
        this.redraw();
    }

    public redraw(): void {
        this.clear();
        this.beginFill(0x8B4513);
        this.lineStyle(2, 0x7CFC00, 1);
        this.moveTo(0, 0);
        for (let i: number = 0; i < this.data.length; i++) {
            if (this.data[i]) {
                this.lineTo(i, this.data[i]);
            }
        }
        this.lineTo(this.width, 0);
        this.lineTo(0, 0);
        this.endFill();
    }
}
