const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Guy Katz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Guy Katz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Help!!! I need somebody',
        title: 'Help',
        name: 'Guy Katz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (position) =>
        weather(position, (data) =>
            res.send({
                forecast: data.weather.weather_descriptions[0],
                location: req.query.address,
                myLocation: data.location
                
            })
        )
    )




})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'No help article found',
        title: 'Oops',
        name: 'Guy Katz'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        helpMessage: 'This page cannot be found',
        title: 'Oops',
        name: 'Guy Katz'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})