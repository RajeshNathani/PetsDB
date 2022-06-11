# Pets DB

It is a NodeJs project which connects to mongodb and stores data of pets.

## Features

- A POST route “/api/pet” to add pets from an excel file
- A GET route “/api/pet” to get all the pets in the database
- A GET route “/api/pet/<petId>” to get a specific pet (petId will be a dynamic value eg. /api/pet/abc123)
- A PATCH route “/api/pet/<petId>” to update the details of a specific pet
- A DELETE route “/api/pet/<petId>” to delete a specific pet

## Columns in the excel file

1. Name
2. Type
3. Breed
4. Age

## Tools and Libraries used

1. ExpressJS (4.18.1)
2. xlsx (To parse excel file) (0.18.5)
3. mongoose (6.3.6}(To connect to mongodb Atlas)
4. dotenv (0.18.5)

## How to run?

- clone the repo
- run <code>node index.js</code>

