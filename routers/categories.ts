import express from "express";

const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
    return res.send("Here are your categories: ");
});

categoriesRouter.get("/:id", (req, res) => {
    const category_id = req.params.id;
    return res.send(category_id);
});

categoriesRouter.post("/", (req, res) => {
    return res.send(req.body);
});

categoriesRouter.delete("/:id", (req, res) => {
    const category_id = req.params.id;
    return res.send(category_id);
});

export default categoriesRouter;