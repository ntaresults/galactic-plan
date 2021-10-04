//Importing modules
const express = require('express');
const tour = require('./public/scripts/tour.json')


// as
//Setup middleware
const app = express();
app.listen(process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));



//Routing
app.get('/', function(req, res){
    res.render('index')
})


app.get('/about', function(req, res){
    res.render('about')
})


app.get('/solarsystem', function(req, res){
    res.render('solar-system')
})


app.get('/book', function (req, res) {
    res.render('book')
})


app.get('/tour/:name', function(req,res){
    res.render('tour', {info: tour[req.params.name], name: req.params.name})
})


app.get('/book/:name', function(req, res){
    res.render('bookForm')
})


app.get('/shop', function (req, res) {
    res.render('shop')
})

app.get('/shop/checkout', function (req, res) {
    res.render('checkout')
})


// Twilio
const accountSid = 'AC79a1a3c005662307dab23608e30aaa66';
const authToken = '6e72e06be10c5a4764d012a8f8bf1cad';
const client = require('twilio')(accountSid, authToken);


app.post('/book', function(req, res){
    client.messages
        // from: '+16692894956',
        .create({
            body: 'Hey' + req.body.name + ", We have recieved your booking for going to " + req.body.planet + ". We'll get in touch with you soon.\nBooking ID: 202109007.\nThanks,\nGalactic Tour",
            messagingServiceSid: 'MG3035fbd0df5faea01bd3e78d97dd801c',
            to: req.body.phonenumber
        })
        .then(message => console.log(message.sid))
    .done();
})


// DB
/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";*/
const firebaseConfig = {
    apiKey: "AIzaSyAWYG1MUmOFfvM0gtFGm0nz4x1kVEHtw-w",
    authDomain: "galactic-tour.firebaseapp.com",
    projectId: "galactic-tour",
    storageBucket: "galactic-tour.appspot.com",
    messagingSenderId: "143216449337",
    appId: "1:143216449337:web:6145e70f4316341ea47ae8",
    measurementId: "G-LSZVVT50KY"
};

const firebase = require("firebase/app");
const fs = require('firebase/firestore');
const admin = require("firebase-admin");
const serviceAccount = require("./public/firebase/firebase-key.json")
// const fire = initializeApp(firebaseConfig);
// const analytics = getAnalytics(fire);



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://galactic-tour.firebaseapp.com"
});
