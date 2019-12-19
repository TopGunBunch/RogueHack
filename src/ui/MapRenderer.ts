import * as ex from 'excalibur';

export class MapRenderer {
    public static WIDTH = 50;

    public static HEIGHT = 38;

    public static SPRITE_SIZE = 16;

    private game: ex.Engine;

    private map: Array<Array<ex.Texture>>;

    constructor(game: ex.Engine) {
        this.game = game;
    }
}
