export class BaseThing {
    x: number;
    y: number;
    i: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    do(map, things) {
        this.i++;
        const directions = ['up', 'left', 'right', 'down'];
        return {
            type: 'emit_move',
            payload: {
                direction: directions[this.i % directions.length],
            }
        }
    }

}