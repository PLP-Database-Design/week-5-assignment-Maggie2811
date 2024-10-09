// import our dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

//CORS AND EJS 

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//test the connection
db.connect((err) => {
    //connection is not successful
    if (err) {
        return console.log("Error Connecting to the database", err)
    }

    //connection is successful
    console.log("Successfully connected to Mysql: ", db.threadId)
}) 


// this is not important for the assignment. its for the neatness of the work on browser
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//QUESTION 1
//retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).render('data', { data})
    })
})


    //QUESTION 2
    //retrieve all providers
    app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err,data) => {
        //if i have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }
        res.status(200).send(data)
    })
})


//QUESWTION 3
//Filter patients by First Name
app.get('/patientsfn', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
})


//QUESTION 4
//Retrieve all providers by their specialty
app.get('/providers-specialty', (req, res) => {
    const getProviders = "SELECT provider_specialty, first_name, last_name FROM providers "
    db.query(getProviders, (err,data) => {
        //if i have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }
        res.status(200).send(data)
    })
})


// start and listen to the server
app.listen(3300, () => {
    console.log('server is running in port 3300...')
})





    // Sending a message to the browser
    console.log('Sending message to browser...');
    app.get('/',(req,res) => {
        res.send('Server Started Successfully!');
    });


