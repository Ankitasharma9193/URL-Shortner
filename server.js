const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

// Database
mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true, useUnifiedTopology: true // this will take care of all the deprecated issue/warnings
});

// MIddlewares

app.set( 'view engine', 'ejs' ); // set up ejs for templating
app.use(express.urlencoded({ extended: false })); // middleware for handling url

// Routes
app.get('/', async (req, res) => {
   const shortUrl = await ShortUrl.find().maxTimeMS(30000);
    res.render('index', ({shortUrls: shortUrl}));
})

app.post('/shortUrl', async (req, res) => {
    try{
        console.log('I am happening')
        await ShortUrl.create({fullUrl: req.body.fullURL}) // req.body.fullURL comes from form input> nme="fullURL" in index.ejs
        res.redirect('/'); //redirecting to homepage, app.get('/) line 17
    } catch(error) {
        console.log("Error in post request", error);
    }
})

app.listen(process.env.PORT || 5000);