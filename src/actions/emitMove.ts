import {Listener} from 'src/Resolver';

const emitMoveBasicAction: Listener = {
    type: 'emit_move',
    resolve: (event, world) => {
        const {
            who,
            payload,
        } = event;
        const {
            direction,
        } = payload;
        const {
            map,
            things,
            log,
        } = world;
        const {
            x, y,
        } = who;
        let nextX = x;
        let nextY = y;
        switch (direction) {
            case 'right':
                nextX++;
                break;
            case 'left':
                nextX--;
                break;
            case 'up':
                nextY--;
                break;
            case 'down':
                nextY++;
                break;
        }
        const cell = map.getByCoordinates(nextX, nextY);
        if (cell.isMoveable()) {
            who.x = nextX;
            who.y = nextY;
            log.push(`${who.title} двигнулся`);
        } else {
            log.push(`${who.title} ебунлся об стену (но он хотя бы попытался, не то что ты)`);
        }
    }
}

export default emitMoveBasicAction;
