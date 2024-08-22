import express from "express";
import fileDb from "../fileDb";
import {CategoryType, PlaceType} from "../types";

const placesRouter = express.Router();

placesRouter.get("/", async (req, res) => {
    const allPlaces = await fileDb.getPlaces();

    return res.send(allPlaces);
});

placesRouter.get("/:id", (req, res) => {
    const place_id = req.params.id;
    return res.send(place_id);
});

placesRouter.post("/", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({error: "Title must be present in the request"});
    }
    const place: PlaceType = {
        title: req.body.title,
        description: req.body.description || null,
    }
    const savedPlace = await fileDb.addPlace(place);

    return res.send(savedPlace);});

placesRouter.delete("/:id", (req, res) => {
    const place_id = req.params.id;
    return res.send(place_id);
});

export default placesRouter;