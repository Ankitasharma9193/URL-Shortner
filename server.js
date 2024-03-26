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
    res.render('index', ({shortUrls: shortUrl})); //we are sending the whole payload
})

app.post('/shortUrl', async (req, res) => { // /shortUrl is the action in form, which trigger this route when submit button
    try{
        await ShortUrl.create({fullUrl: req.body.fullURL}) // req.body.fullURL comes from form input> name="fullURL" in index.ejs
        res.redirect('/'); //redirecting to homepage, app.get('/) line 17
    } catch(error) {
        console.log("Error in post request", error);
    }
})

app.get('/:shortUrl', async (req, res) => {
    const shortURL = await ShortUrl.findOne({ shortUrl : req.params.shortUrl });
    console.log('This is our URL ~~~~~~~~~~~~~~~~~~~', shortURL);
    if (!shortURL) {
        res.sendStatus(404)
    }
    shortURL.clicks++;
    shortURL.save();
    res.redirect(shortURL.fullUrl)
})

app.listen(process.env.PORT || 5000);