const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");
const dot_env = require("dotenv").config();
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//const { document } = new JSDOM("").window;
//global.document = document;

let city_name = "trondheim";

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function weatherCheck() {
  const response = await fetch(
    url + `&q=${city_name}` + `&appid=${process.env.APIKEY}`
  );

  try {
    let data = await response.json();
    //console.log(data);
    //document.getElementById(".city-name").innerHTML = data.name;
    //console.log(data.name);
    return data;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

const port = 3000;
const app = express();

app.use(express.static("src"));

//create webserver with multiple endpoints is what i need to look up
//the second endpoint will serve the other conent

app.get("/1234", (req, res) => {
  weatherCheck().then(
    (x) => res.send(x),
    (x) => res.send("error")
  );
});

app.listen(port, function (error) {
  if (error) {
    console.log("Error Occurred", error);
  } else {
    console.log("Server Listening on Port: " + port);
    console.log("Now the Server is running in url: http://127.0.0.1:" + port);
  }
});
