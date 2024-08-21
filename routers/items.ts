import express from "express";

const itemsRouter = express.Router();

itemsRouter.get("/", (req, res) => {
    return res.send("Here are your items: ");
});

itemsRouter.get("/:id", (req, res) => {
    const item_id = req.params.id;
    return res.send(item_id);
});

itemsRouter.post("/", (req, res) => {
    return res.send(req.body);
});

itemsRouter.delete("/:id", (req, res) => {
    const item_id = req.params.id;
    return res.send(item_id);
});

export default itemsRouter;