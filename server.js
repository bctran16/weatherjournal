// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express(); 
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 5500; 
const server = app.listen(port, () => {console.log(`server running at port ${port}`)});

// Get Request Server Side
app.get('/addEntry', (req, res) => res.send(projectData));

// Post Request Server Side
app.post('/addEntry', (req, res) => { 
    makeData(req); 
});

function makeData (req) {
    let newData = req;
    let newEntry = {
        temp: req.body.temp,
        date: req.body.date, 
        feeling: req.body.feeling
    }
    console.log(newEntry);
    projectData.push(newEntry);
}



