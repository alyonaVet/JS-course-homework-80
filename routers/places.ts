import express from "express";

const placesRouter = express.Router();

placesRouter.get("/", (req, res) => {
    return res.send("Here are your places: ");
});

placesRouter.get("/:id", (req, res) => {
    const place_id = req.params.id;
    return res.send(place_id);
});

placesRouter.post("/", (req, res) => {
    return res.send(req.body);
});

placesRouter.delete("/:id", (req, res) => {
    const place_id = req.params.id;
    return res.send(place_id);
});

export default placesRouter;