const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    css: ["index.css"]
  });
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then((response) => {
    res.render('beers.hbs', {
      beers: response,
      css: ["beersPage.css"],
    })
  })
  
})

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom().
  then((response) => {
    res.render('random-beer.hbs', {
      beer: response[0],
      css: ["beersPage.css"]
    })
  })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
