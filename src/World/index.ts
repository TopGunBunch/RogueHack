import {Resolver} from '../Resolver/index';
import basicActions from 'src/actions';
import {Log} from 'src/Log';

export class World {
    map: IMap;
    things: Array<IThing>;
    resolver: Resolver;
    log: any;

    constructor() {
        this.map = null;
        this.things = [];
        this.resolver = new Resolver({
            world: this,
        });
        this.log = new Log();
        this.loadBasicActions();
    }

    loadBasicActions() {
        basicActions.forEach(({type, resolver}) => {
            this.resolver.addResolver(type, resolver);
        });
    }

    do() {
        for (let i = 0; i < this.things.length; i++) {
            const thing = this.things[i];
            const action = thing.do(this.map, this.things);
            const event = {
                who: thing,
                ...action,
            };
            this.resolver.resolve(event);
        }
    } 

    render() {

        // for (let i = 0; i < this.ma)
    }

    addThing(a: IThing) {
        this.things.push(a);
    }
}