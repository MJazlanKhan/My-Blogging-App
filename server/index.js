import express from 'express'
import cors from 'cors';

import bodyParser from 'body-parser';
import authRoutes from './routes/Blog.js'
import connectToMongo from './config/db.js';
const app = express();
app.use(bodyParser.json());
const PORT = 9000;
app.use('/uploads', express.static('uploads'));


connectToMongo()
app.get("/", (req, res) => {
    res.send("API is Running....")
});
app.use(cors());
app.use(express.json())


// API ROUTES

app.use("/api/v1", authRoutes)

app.listen(PORT, () => {
    console.log(`API is Running on Port ${PORT}`)
})