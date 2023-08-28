const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const sharp = require('sharp');
const  {IncomingForm} = require('formidable');
const path = require('path');
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : false }))
const PORT = process.env.PORT




app.get('/', (req, res) => {
    res.send("Main Page")
});

app.post('/short', (req, res) => {
    const form = new IncomingForm;

    form.parse(req, (err, fields, files) => {
        console.log(fields)
        fs.readFile(files.payload.filepath, {}, (err, data) => {
            try {
                sharp((path.join(__dirname, "black.png"), data)).resize(200,200).jpeg({quality : 50}).toFile(path.join(__dirname, "done.jpg"));
                res.send("working")
            } catch (err) {
                res.send("Theirs is an error")
            }
        })
    })
});



app.post('/normal', (req,res) => {
    const form = new IncomingForm;

    form.parse(req, (err, fields, files) => {
        console.log(fields)
        fs.readFile(files.payload.filepath, {}, (err, data) => {
            try {
                fs.writeFileSync(path.join(__dirname, "black.png"), data)
                res.send("working")
            } catch (error) {
                res.send("Theirs is an error")
            }
        })
    })
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));