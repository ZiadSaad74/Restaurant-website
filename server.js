// Require Express to run server and routes


const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
const path = require("path");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'website/Home.html'));
});
const port = 8080;


// Setup Server
const server = app.listen(port, listening);

function listening() {
    //console.log(server);
    console.log(`running on localhost: ${port}`);
}

app.post('/signUp', signUp);

function signUp(req, res) {
    let data = req.body;
    fs.appendFile('users.txt', JSON.stringify(data) + ',', function (err) {
        if (err) throw err;
        console.log('Saved!');

    });
}

app.post('/login', login);

function login(req, res) {
    let data = req.body;
    fs.readFile('users.txt', "utf8", (err, users) => {
        if (err) throw err;


        // Display the file content
        const array = JSON.parse('[' + users.slice(0, -1) + ']')
        const result = searchArray(array, data.email, data.password)
        res.send(result)
        console.log(result)
    });
}


function searchArray(array, email, password) {
    let result;
    for (const object of array) {
        if (object.email === email && object.password === password) {
            result = object;
            break;
        } else if (object.email === email && object.password !== password) {
            result = {msg: "Wrong password!"}
            break;
        }
        else result =  {msg: "This account does not exist!"}
    }
    return  result;
}

app.post('/booking', booking);

function booking(req, res) {
    let data = req.body;
    fs.appendFile('bookings.txt', JSON.stringify(data)+',', function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.sendStatus(200);
    });
}