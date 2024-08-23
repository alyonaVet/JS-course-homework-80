import express from "express";
import fileDb from "../fileDb";
import {CategoryType} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
    const allCategories = await fileDb.getCategories();

    return res.send(allCategories);
});

categoriesRouter.get("/:id", (req, res) => {
    const category_id = req.params.id;
    return res.send(category_id);
});

categoriesRouter.post("/", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({error: "Title must be present in the request"});
    }
    const category: CategoryType = {
        title: req.body.title,
        description: req.body.description || null,
    }
    const savedCategory = await fileDb.addCategory(category);

    return res.send(savedCategory);
});

categoriesRouter.delete("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        await fileDb.deleteCategory(categoryId);
        return res.status(200).send({ message: "Category was deleted successfully" });
    } catch (error) {
        next(error);
    }
});

export default categoriesRouter;