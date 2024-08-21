import express from 'express';
import categoriesRouter from "./routers/categories";
import placesRouter from "./routers/places";
import itemsRouter from "./routers/items";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);


const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};

run().catch(console.error);