// Setup empty JS object to act as endpoint for all routes
let projectData = [];
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(9000,()=>{
    console.log('we are listeing on port 9000');
})
app.get('/geteData',(req , res)=>{
    res.json(projectData);
    // console.log(projectData);
});

app.post('/addData',addDataUser);

function addDataUser(req,res){
     newData = {
        temperature: req.body.temperature,
        date: req.body.date,
        cFeeling: req.body.cFeeling
    }
     projectData.push(newData); 
     res.end();
}