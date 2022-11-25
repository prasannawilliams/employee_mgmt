require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());


app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})