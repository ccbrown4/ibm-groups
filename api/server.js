const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

const admin = require('./routes/api/admin');
const users = require('./routes/api/users');
const persons = require('./routes/api/persons');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(morgan('dev'));

// body parser midware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// db configuration
const mongoURI = require('./config/keys').mongoURI;

// mongo connection
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongo connected"))
    .catch(error => console.log(error));

// routes
app.use(`/api/admin`, admin);
app.use(`/api/users`, users);
app.use(`/api/persons`, persons);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));


