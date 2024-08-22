import {promises as fs} from 'fs';
import {Category, CategoryType, Item, ItemType, Place, PlaceType} from "./types";

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
    async getCategories() {
        return data.categories;
    },
    async getPlaces() {
        return data.places;
    },
    async getItems() {
        return data.items;
    },
    async addCategory(category: CategoryType) {
        const id = crypto.randomUUID();
        const categoryData = {id, ...category};
        data.categories.push(categoryData);
        await this.save();
        return categoryData;
    },
    async addPlace(place: PlaceType) {
        const id = crypto.randomUUID();
        const placeData = {id, ...place};
        data.places.push(placeData);
        await this.save();
        return placeData;
    },
    async addItem(item: ItemType) {
        const id = crypto.randomUUID();
        const itemData = {id, ...item};
        data.items.push(itemData);
        await this.save();
        return itemData;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }

};

export default fileDb;