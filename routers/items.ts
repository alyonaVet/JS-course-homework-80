import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
import {ItemType} from "../types";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
    try {
        const allItems = await fileDb.getItems();
        return res.send(allItems);
    } catch (error) {
        next(error);
    }
});

itemsRouter.get("/:id", async (req, res, next) => {
    const item_id = req.params.id;
    try {
        const item = await fileDb.getItemById(item_id);
        if (!item) {
            return res.status(404).send({message: "Item not found"});
        }
        return res.send(item);

    } catch (error) {
        next(error);
    }
});

itemsRouter.post("/", imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.title || !req.body.category_id || !req.body.place_id) {
        return res.status(400).send({error: "Title, categoryId and placeId must be present in the request"});
    }
    const item: ItemType = {
        title: req.body.title,
        category_id: req.body.category_id,
        place_id: req.body.place_id,
        description: req.body.description || null,
        image: req.file ? req.file.filename : null,
    };
    try {
        const savedItem = await fileDb.addItem(item);
        return res.send(savedItem);
    } catch (error) {
        next(error);
    }
});

itemsRouter.delete("/:id", async (req, res, next) => {
    const item_id = req.params.id;
    try {
        await fileDb.deleteItem(item_id);
        return res.status(200).send({message: "Item was deleted successfully"});
    } catch (error) {
        next(error);
    }
    return res.send(item_id);
});

itemsRouter.put("/:id", imagesUpload.single('image'), async (req, res, next) => {
    const item_id = req.params.id;

    const newItemData: ItemType = {
        title: req.body.title,
        category_id: req.body.category_id,
        place_id: req.body.place_id,
        description: req.body.description || null,
        image: req.file ? req.file.filename : null,
    };

    try {
        const updatedItem = await fileDb.updateItem(item_id, newItemData);
        if (!updatedItem) {
            return res.status(404).send({error: "Item not found"});
        }
        return res.send(updatedItem);
    } catch (error) {
        next(error);
    }
});

export default itemsRouter;