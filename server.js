const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express()
const port = 3000

app.use(bodyParser.json());

app.post('/getWeather-By-XY', async (req, res) => {
    let lat = req.body.lat;
    let lon = req.body.lon;
    let key  = 'fec655654f1efcbf2019c1e5a92cff47'
    let api  = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const x = await fetch(api);
    const json = await x.json();
    console.log(json);
    res.json(json);
})

app.post('/getWeather-By-City', async (req, res) => {
    let city = req.body.city;
    let key  = 'fec655654f1efcbf2019c1e5a92cff47'
    let api  = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const x = await fetch(api);
    const json = await x.json();
    res.json(json);
})

app.use('/', express.static(__dirname));

app.listen(port, () => {
  console.log('on port', port);
})