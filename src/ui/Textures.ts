import * as ex from 'excalibur';

export class Textures {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static get(): any {
        return {
            knight: new ex.Texture('/assets/sprites/knight.png'),
        };
    }

    static getAllAsArray(): Array<ex.Texture> {
        const sprites = this.get();
        return Object.keys(sprites).map((key) => sprites[key]);
    }
}
