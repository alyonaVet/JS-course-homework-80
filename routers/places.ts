import express from "express";
import fileDb from "../fileDb";
import {PlaceType} from "../types";

const placesRouter = express.Router();

placesRouter.get("/", async (req, res, next) => {
    try {
        const allPlaces = await fileDb.getPlaces();
        return res.send(allPlaces);
    } catch (error) {
        next(error);
    }
});

placesRouter.get("/:id", async (req, res, next) => {
    const place_id = req.params.id;
    try {
        const place = await fileDb.getPlaceById(place_id);
        if (!place) {
            return res.status(404).send({message: "Place not found"});
        }
        return res.send(place);

    } catch (error) {
        next(error);
    }
});

placesRouter.post("/", async (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).send({error: "Title must be present in the request"});
    }
    const place: PlaceType = {
        title: req.body.title,
        description: req.body.description || null,
    }
    try {
        const savedPlace = await fileDb.addPlace(place);
        return res.send(savedPlace);
    } catch (error) {
        next(error);
    }
});

placesRouter.delete("/:id", async (req, res, next) => {
    const place_id = req.params.id;
    try {
        await fileDb.deletePlace(place_id);
        return res.status(200).send({message: "Place was deleted successfully"});
    } catch (error) {
        next(error);
    }
});

placesRouter.put("/:id", async (req, res, next) => {
    const place_id = req.params.id;

    const newPlaceData: PlaceType = {
        title: req.body.title,
        description: req.body.description || null,
    };

    try {
        const updatedPlace = await fileDb.updatePlace(place_id, newPlaceData);
        if (!updatedPlace) {
            return res.status(404).send({error: "Place not found"});
        }
        return res.send(updatedPlace);
    } catch (error) {
        next(error);
    }
});

export default placesRouter;