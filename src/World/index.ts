import {Resolver} from '../Resolver/index';

export class World {
    map: IMap;
    things: Array<IThing>;
    resolver: Resolver;
    
    constructor() {
        this.map = null;
        this.things = [];
        this.resolver = new Resolver({
            world: this,
        });
    }

    do() {
        for (let i = 0; i < this.things.length; i++) {
            const thing = this.things[i];
            const action = thing.do(this.map, this.things);
            this.resolver.resolve(action);
        }
    } 

    render() {
        
    }

    addThing(a: IThing) {
        this.things.push(a);
    }
}