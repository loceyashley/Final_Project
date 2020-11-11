//require express
var express = require('express');
//require body parser
var bodyParser = require ("body-parser");
//require node-fetch
 var fetch = require('node-fetch');
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

//get homepage
app.get('/', function(req, res){
     res.render('homepage');
});

//get contact
app.get('/Contact', function(req, res){
    res.render('Contact');
});

//get random pic from api
app.get('/RandomPic', function(req, res){
    fetch('https://dog.ceo/api/breeds/image/random',)
    .then(res => res.json())
    .then(data => {
        res.render('RandomPic', {data:data});
    });

})

//get select dog breed form api
app.get('/DogBreed', function(req, res){
      var dogBreed = req.body.breed;
      console.log('dog name: ' + dogBreed);
    fetch('https://dog.ceo/api/breed/'+dogBreed+'/images/random',)
    .then(res => res.json())
    .then(data => {
        res.render('DogBreed', {data:data});
    });
})

//server setup 
app.listen(port,function(){
    console.log('listening on ' + port)
});

