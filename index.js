var express = require('express');
var routes = require('./routes/routing');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname+'/public'));

//body parser for form handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app);
app.listen(3000, function() {
    console.log('App is ready to be accessed on http://localhost:3000');
});

app.get('/', function(request, response){
    response.sendFile(__dirname+'/public/views/index.html');
})