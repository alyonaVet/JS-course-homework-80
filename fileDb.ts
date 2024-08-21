import {promises as fs} from 'fs';
import {Category, Item, Place} from "./types";

const fileName = './db.json';
let data = {
    categories: [] as Category[],
    places: [] as Place[],
    items: [] as Item[],
};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (error) {
            data = {
                categories: [],
                places: [],
                items: [],
            };
        }
    },

};

export default fileDb;