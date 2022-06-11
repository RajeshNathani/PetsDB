const express = require('express');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const pets = require('./pets.js');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const dotenv = require("dotenv")
app.use(methodOverride('_method'));
dotenv.config();

const DB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.al1gu.mongodb.net/?retryWrites=true&w=majority`;


//read excel file
const file = xlsx.readFile('pets.xlsx');
const sheet = file.Sheets['Sheet1'];
const data = xlsx.utils.sheet_to_json(sheet);

//index route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/Templates/index.html'));
})

//connect to mongoDB
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to mongoDB');
}})

//inserting Excel data into mongoDB using mongoose
app.post('/api/pet', (req, res) => {
    for(let i = 0; i < data.length; i++) {
        const pet = new pets({Name: data[i].Name, Type: data[i].Type, Breed: data[i].Breed, Age: data[i].Age});
        pet.save().then(() => {
            console.log('pet saved');
        }).catch((err) => {
            console.log(err);
        })
    }
    res.send('Pets Added to DB');
})

//get all pets from mongoDB
app.get('/api/pet', (req, res) => {
    pets.find({}, (err, pets) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pets);
        }
    })
})


//get a pet from mongoDB
app.get('/api/pet/:id', (req, res) => {
    pets.findById(req.params.id, (err, pet) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pet);
        }
    })
})

//update a pet in mongoDB
app.patch('/api/pet/:id', (req, res) => {
    pets.findByIdAndUpdate(req.params.id, {Name : "Tomy"}, (err, pet) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.query.name);
            res.send("Pet Updated");
        }
    })
})

//delete a pet from mongoDB
app.delete('/api/pet/:id/', (req, res) => {
    pets.findByIdAndDelete(req.params.id, (err, pet) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("Pet Deleted");
        }
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
