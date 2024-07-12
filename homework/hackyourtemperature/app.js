const express = require('express');
const fetch = require('node-fetch');
const keys = require('./keys');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather",async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required!" });
  }

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`);
    const data = await response.json();

    if (response.ok) {
      const temperature = data.main.temp;
      res.json({ weatherText: `City: ${cityName}, Temperature: ${temperature}` });
    } else {
      res.status(404).json({ weatherText: "City is not found!" });
    }
  } catch (error) {
    res.status(500).json({ weatherText: "An error occurred!" });
  }
});
module.exports = app;