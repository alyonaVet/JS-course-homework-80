import express from "express";
import fileDb from "../fileDb";
import {CategoryType} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
    try {
        const allCategories = await fileDb.getCategories();
        return res.send(allCategories);
    } catch (error) {
        next(error);
    }
});

categoriesRouter.get("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const category = await fileDb.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send({message: "Category not found"});
        }
        return res.send(category);
    } catch (error) {
        next(error);
    }
});

categoriesRouter.post("/", async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({error: "Title must be present in the request"});
        }
        const category: CategoryType = {
            title: req.body.title,
            description: req.body.description || null,
        }
        const savedCategory = await fileDb.addCategory(category);

        return res.send(savedCategory);
    } catch (error) {
        next(error);
    }
});

categoriesRouter.delete("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        await fileDb.deleteCategory(categoryId);
        return res.status(200).send({message: "Category was deleted successfully"});
    } catch (error) {
        next(error);
    }
});

categoriesRouter.put("/:id", async (req, res, next) => {
    const categoryId = req.params.id;

    const newCategoryData: CategoryType = {
        title: req.body.title,
        description: req.body.description || null,
    };
    try {
        const updatedCategory = await fileDb.updateCategory(categoryId, newCategoryData);
        if (!updatedCategory) {
            return res.status(404).send({error: "Category not found"});
        }
        return res.send(updatedCategory);
    } catch (error) {
        next(error);
    }
});

export default categoriesRouter;