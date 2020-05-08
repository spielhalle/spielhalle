/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

export class SudokuFieldService {
    public field: number[][] = [[]];
    public boardSize: number = 25;
    private mboxSize: number = 3;
    public constructor() {
        this.field = new Array(9).fill(0).map((): number[] => new Array<number>(9).fill(0));
    }

    public get boxSize(): number {
        return this.mboxSize;
    }

    public setBoxSize(size: number): void {
        this.mboxSize = size;
        this.boardSize = size ** 2;
        this.field = new Array(this.boardSize).fill(0).map((): number[] => new Array<number>(this.boardSize).fill(0));
    }

    public setCell(x: number, y: number, value: number): void {
        console.log(this.field, x, y, value);
        this.field[y][x] = value;
    }

    public clear(): void {
        this.field = new Array(this.boardSize).fill(0).map((): number[] => new Array<number>(this.boardSize).fill(0));
    }

}
