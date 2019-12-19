import mapJson from "./resources/map.json";

interface MapObject {
    map: Array<Array<string>>,
    size: {
        width: number,
        height: number,
    }
}

export class Map {
    map: Array<Array<string>>;
    width: number;
    height: number;

    constructor(mapObject: MapObject = mapJson) {
        const {map: initMap, size: initSize} = mapObject;
        this.map = initMap;
        this.width = initSize.width;
        this.height = initSize.height;
    }

    public print(): void {
        console.log(this.map);
    }

    public getItemByCoordinates(x: number, y: number) {
        return this.map[x][y];
    } 
}