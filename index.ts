import express from 'express';
import categoriesRouter from "./routers/categories";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});