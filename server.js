const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');

const app = express();
app.use(cors());

app.get('/location', (request, response) => {
    try{
        superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY`);
        const location = new Location(request.query.location, geoData)
        response.send(location);
    } catch(error){
        response.status(500).send('Sorry, something went wrong.')
    }
})

function Location(query, geoData){
    this.search_query = query;
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('/weather', (request, response) => {
    try {
        const darkskyData = require('./darksky.json')
        const weather = new Weather(darkskyData)
        response.send(weather.weather);
    } catch(error){
        response.status(500).send('Sorry, this page is a broke.')
    }
})

function Weather(darkskyData){
    let days = [];
    for(const day of darkskyData['daily']['data']) {
        let date = new Date(day.time * 1000);
        days.push({
            'forecast': day.summary,
            'time': date.toString().slice(0, 15)
        })
    this.weather = days;
}}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is listening');
})