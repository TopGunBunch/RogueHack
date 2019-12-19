
import { World } from "src/World";

export type MessageType = 'emit_move'
    | 'move';

export type Message = {
    type: MessageType;
    payload: any;
}

export type Listener = {
    type: MessageType;
    resolve: Function;
};

type ResolverProps = {
    world: World;
}

export class Resolver {
    listeners: Array<Listener>;
    world: World;

    constructor(props: ResolverProps) {
        this.world = props.world;
        this.listeners = [];
    }

    addResolver(type: MessageType, resolve: Function) {
        this.listeners.push({
            type,
            resolve,
        });
    }

    resolve(a: Event) {
        let done = false;
        const listeners = this.listeners.filter(x => x.type === a.type);
        for (let i = 0; i < listeners.length; i++) {
            done = listeners[i].resolve(a, this.world);
            if (done) {
                return;
            }
        }
    }
}