const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//connection to DB
const connection = mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true });
mongoose.Promise = global.Promise;


//set up express app
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

// error handling middleware
app.use((err, req, res, next) => {
   // console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 3000, function () {
    console.log('Server now listening for requests');
});
