//creating the server first
const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Now to use EJS - we don't need to require EJS manually because it is done internally by EXPRESS
//view engine :- view = template -> package which creates our template is view engine
//We render responses with EJS and not send them.
//if we need to send html,css,etc in the form of file then we use res.render
//view engine by default expects all the templates to be stored in the views directory.
app.set("view engine", "ejs");
//If you start your server from the parent directory of EJS_Templating then the 
// server won't be able to find the view directory and may cause error
/**
 * So to avoid this we can set the path by imporing/requiring the path and using its
 * join function
 * 
 * Here, _dirname is the directory which contains the server - index.js which is:
 * EJS-Templating and then we specify /views -> EJS-Templating/views
 * So now it will always be located correctly
 */
const path = require('path');
//this sets the setting of express - setting: "views" - 
//basically sets the directory of views
app.set("views", path.join(__dirname, "views"));  //it avoids error

//it helps to access the static files - CSS,JS 
app.use(express.static(path.join(__dirname, "public")));


//get request
app.get("/", (req, res) => {
    res.render('homeSignup'); //it by default searches in views directory so we don't write directory
});

app.get("/hello", (req, res) => {
    res.send('homeSignup'); //it by default searches in views directory so we don't write directory
})

//Interpolation Syntax
/**
 * It refers to embedding expressions into marked up text
 * `This is ${name}` -> This is embedding value of name here
 * Likewise we will embed whole bunch of javascripts and all
 * 
 * This makes our html dynamic -changes our html in runtime - 
 * -as the information come - it will change html dynamically
 */

/**
 * Tags of EJS
 * <%= -> Outputs the value into the template (HTML escaped - If the webpage just 
 * shows user inputs without checking, the browser will run this script, which could be 
 * dangerous!
 */

const people = [
    {name: "Aaditya", age: 19, country: "Nepal"},
    {name: "Swe", age: 18, country: "USA"},
    {name: "Sus", age: 17, country: "Denmark"},

]

app.get('/test', (req, res) => {
    res.render('test', {users: people}); //no path needed - auto detect views dir
    //no extension needed
});

/**
 *  <%=   %>   -> used to output data into html (escaped)
 */

app.get('/rolldice', (req, res) => {
    let diceVal = Math.trunc(Math.random() * 6) + 1; //this data comes from database which we will study later
    // res.render('rolldice', {currDice: diceVal}); 
    res.render('rolldice', {diceVal}); //this is also correct and shorthand
    //we can pass a second argu which must be an object and we can access
    //its value (diceVal) with the key(currDice) in EJS
})

//lets create a basic instagram EJS 
app.get('/ig/:username', (req, res) => {
    //got a data from database which is generally in the form of json - data.json - which we need to require
    const instaData = require('./data.json');
    let {username} = req.params;
    let data = instaData[username];

    if(!data) {
        res.status(400).send("User not found");
    }
    
    res.render('insta', {data}); //always remember the second parameter that is the data has to be an object
})





