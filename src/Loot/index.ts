export class Loot {
    private LOOT_CATALOGUE: {
        weapon: {
            woodStick: {
                name: 'Wood stick',
                power: 1,
                rareness: 1,
            },
            blade: {
                name: 'Blade',
                power: 3,
                rareness: 3,
            },
            hatchet: {
                name: 'Hatchet',
                power: 5,
                rareness: 5,
            },
        },
        protection: {
            helmet: {
                name: 'Helmet',
                power: 5,
                rareness: 5,
            },
        },
        food: {
            dragonWings: {
                name: 'Dragon wings',
                power: 5,
                rareness: 5,
            }
        },
        different: {

        }
    };

    private getRandom(max, min=0) {
        return Math.floor(Math.random()*(max - min) + min);
    }

    private lootGenerator() {
        const categoriesOfLoot = Object.keys(this.LOOT_CATALOGUE);
        const catalogueCategoriesSize = categoriesOfLoot.length;
        const chosenCategory = this.LOOT_CATALOGUE[categoriesOfLoot[this.getRandom(catalogueCategoriesSize - 1)])];
        const lootsKeys = Object.keys(chosenCategory);
        const lootsQuantity = lootsKeys.length;
        const tempLoot = chosenCategory[lootsKeys[this.getRandom(lootsQuantity - 1)]];
        const recievedLoot = {...tempLoot};
        return recievedLoot;
    }

    public getLoot() {
        return this.lootGenerator();
    }
};