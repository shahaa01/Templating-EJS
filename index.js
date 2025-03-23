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



