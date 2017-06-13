/**Created by Ibrahim Ayman on 13/06/2017. */

var express = require("express");
var hbs = require("hbs");
var app = express();
var fs = require('fs');
const port = process.env.port || 3000;

//******************************************************
app.set('view engine', 'hbs'); // handelbarjs library
hbs.registerPartials(__dirname + '/views/partials');
// Hbs Helper Methods
hbs.registerHelper('GetCurrentYear', function () {
    return new Date().getFullYear();
});
hbs.registerHelper('screemIt', function (text) {
    return text.toUpperCase();
});
//******************************************************

app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = now + ":" + req.method + ":" + req.url;

    console.log(log);
    fs.writeFile('server.log', log + "\n", function (err) {
        if (err) {
            console.log("cannt append to log file");
        }
    });
    next();
});

// app.use(function (req, res, next) {
//     res.render("maintenance.hbs");
// });

// must be after app.use Methods.
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // res.send("hello Express");
    // res.send("<h1>hello Express</h1>");
    res.send({
        name: "ibrahim",
        info: [
            "25/08/1993",
            "Mansoura"
        ]
    });
});

app.get('/home', function (req, res) {
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMessage: "Welcome to our website"
    })
});


app.get('/about', function (req, res) {
    res.render('about.hbs', {
        pageTitle: 'about page'
    })
});

app.get('/projects', function (req, res) {
    res.render('projects.hbs', {
        pageTitle: 'projects'
    })
});


app.get('/bad', function (req, res) {
    res.send({
        errorMessage: "unable to handel request"
    });
});


app.listen(port, function () {
    console.log('server is up on port : ' + port);
});