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
        return data.categories.map(category => ({
            id: category.id,
            title: category.title,
        }));
    },
    async getCategoryById(id: string) {
        const category = data.categories.find(category => category.id === id);
        return category || null;
    },
    async updateCategory(id: string, newCategoryData: CategoryType) {
        const category = await this.getCategoryById(id);

        if (!category) {
            return null;
        }
        category.title = newCategoryData.title;
        category.description = newCategoryData.description;
        await this.save();
        return category;
    },
    async getPlaces() {
        return data.places.map(place => ({
            id: place.id,
            title: place.title,
        }));
    },
    async getPlaceById(id: string) {
        const place = data.places.find(place => place.id === id);
        return place || null;
    },
    async updatePlace(id: string, newPlaceData: PlaceType) {
        const place = await this.getPlaceById(id);

        if (!place) {
            return null;
        }
        place.title = newPlaceData.title;
        place.description = newPlaceData.description;
        await this.save();
        return place;
    },
    async getItems() {
        return data.items.map(item => ({
            id: item.id,
            title: item.title,
            category_id: item.category_id,
            place_id: item.place_id,
        }));
    },
    async getItemById(id: string) {
        const item = data.items.find(item => item.id === id);
        return item || null;
    },
    async updateItem(id: string, newItemData: ItemType) {
        const item = await this.getItemById(id);

        if (!item) {
            return null;
        }
        item.title = newItemData.title;
        item.category_id = newItemData.category_id;
        item.place_id = newItemData.place_id;
        item.description = newItemData.description;
        item.image = newItemData.image;

        await this.save();
        return item;
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
    async deleteCategory(id: string) {
        const items = await this.getItems();
        const itemCategory = items.some(item => item.category_id === id);

        if (itemCategory) {
            throw new Error(`Could not delete category with assigned items.`);
        }
        data.categories = data.categories.filter(category => category.id !== id);
        await this.save();
    },
    async deletePlace(id: string) {
        const items = await this.getItems();
        const itemPlace = items.some(item => item.place_id === id);

        if (itemPlace) {
            throw new Error(`Could not delete place with assigned items.`);
        }
        data.places = data.places.filter(place => place.id !== id);
        await this.save();
    },
    async deleteItem(id: string) {
        data.items = data.items.filter(item => item.id !== id);
        await this.save();
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }

};

export default fileDb;