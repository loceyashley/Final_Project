//require express
var express = require('express');
//require body parser
var bodyParser = require ("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//require nodemailer
const nodemailer = require('nodemailer');
//create express object call express
var app = express();
//create port information 
const port = process.env.PORT || 3000;
//tells application to use ejs for templates
app.set('view engine', 'ejs');
//make styles pulic
app.use(express.static("Public"));
//tell app to use body parser
app.use(bodyParser.urlencoded({extended: true}));

var dogBreed = "beagle";
var sent = false;
//get homepage
app.get('/', function(req, res){
     res.render('homepage');
});

//get contact
app.get('/Contact', function(req, res){
    res.render('Contact',  { sent: sent });
});

app.post('/sendEmail', (req, res) => {
    //intall the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'planetcanine2020@gmail.com', //Email specifically for this project
            pass: 'SSPC_Final'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    var user = req.body.email;
    var message = req.body.message;
    //specify what the email will look like
    const mailOpts = {
        from: user,
        to: 'planetcanine2020@gmail.com',
        subject: 'Planet Canine user sent a message!',
        text: user + ' wrote: ' + message
    }

    smtpTrans.sendMail(mailOpts, function (err, res) {
        if (err) {
            console.error('there was an error: ', err);
        }
        else {
            console.log("Message was sent!");
            sent = true;
        }
    })
    res.redirect('/Contact');
});

//get random pic from api
app.get('/RandomPic', function(req, res){
    var breedData;
    var breed;
    var showBreed = "showBreed";
    fetch('https://dog.ceo/api/breeds/image/random',)
    .then(res => res.json())
    .then(data => {
        breedData = data.message.split('/');
        breed = breedData[4];
        data[showBreed] = breed;
        console.log(data);
        res.render('RandomPic', {data:data});
    });
})

var dogList = [];
var dogList2 = [];
var dogList3 = [];
var showImage = "showImage";
var showImage2 = "showImage2";
var showImage3 = "showImage3";
//get select dog breed form api
app.get('/DogBreed', function(req, res){
    fetch('https://dog.ceo/api/breed/'+dogBreed.toLowerCase()+'/images',)
    .then(res => res.json())
    .then(data => {
        dogList = data.message[1];
        dogList2 =data.message[5];
        dogList3=data.message[10];
        data[showImage] = dogList;
        data[showImage2] = dogList2;
        data[showImage3] = dogList3;
        //console.log(dogList);
       // console.log(dogList2);
       //console.log(dogList3);
        res.render('DogBreed', {data:data});
    });
})
app.post('/DogBreed', function(req, res){
    dogBreed = req.body.breed;
    res.redirect('/DogBreed');
})
//server setup 
app.listen(port,function(){
    console.log('listening on ' + port)
});

