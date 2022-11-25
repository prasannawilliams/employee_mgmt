require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer({});

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

app.post('/uploadlogo', upload.single('logo'), (req, res, next) => {
    // encoded has the base64 of your file
    const encoded = req.file.buffer.toString('base64');
    console.log('%c encoded Prasanna----->:','font-weight: bold', encoded);
});

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})