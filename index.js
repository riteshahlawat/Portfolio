require("dotenv").config();

const express = require("express");
const expressIp = require("express-ip");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");
// IP lookup
const whois = require("whois");
const whoisParser = require("parse-whois");
// DISCORD
const Discord = require("discord.js");
const bot = new Discord.Client();

const DTOKEN = process.env.TOKEN;

bot.login(DTOKEN);
const app = express();

app.use(sslRedirect());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressIp().getIpInfoMiddleware);

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"]
  })
);

app.get("/storeIp", (req, res) => {
  const ipInfo = req.ipInfo;
  console.log(ipInfo.ip);
  let tempIp = "72.136.0.216";
  let yourIp = process.env.IP;
  let parsedData;

  let organization = "";
  let address = "";
  let city = "";
  let state = "";
  let country = "";

  let message;
  // WhoIs lookup
  whois.lookup(tempIp, (err, data) => {
    if (err) console.log(err);

    parsedData = whoisParser.parseWhoIsData(data);
    // Get varaiables
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].attribute == "Organization") {
        organization = parsedData[i].value;
      } else if (parsedData[i].attribute == "Address") {
        // Multiple lines are stored multiple times
        if (address == "") {
          // First line
          address = parsedData[i].value;
        } else {
          // Second+ line
          address += ", " + parsedData[i].value;
        }
      } else if (parsedData[i].attribute == "City") {
        city = parsedData[i].value;
      } else if (parsedData[i].attribute == "StateProv") {
        state = parsedData[i].value;
      } else if (parsedData[i].attribute == "Country") {
        country = parsedData[i].value;
      }
    }
    // Make message to send to channel
    message = `Someone went on your website!! \n \n IP: ${tempIp} \n Organization: ${organization} \n Address: ${address} \n City: ${city} \n State: ${state} \n Country: ${country}`;

    // General channel
    bot.channels
      .fetch("694702074130202697")
      .then(channel => {
        channel.send(message, {
          // Options
          files: ["https://i.ytimg.com/vi/AgmnUl31_ng/maxresdefault.jpg"]
        });
        res.send(ipInfo);
      })
      .catch(error => {
        console.log(error);
      });
  });

  
});

const PORT = 443;

app.listen(process.env.PORT || PORT, err => {
  if (err) console.log;
  console.log(`Server started on port: ${PORT}`);
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}`);
});
// When a message is sent
bot.on("message", msg => {});
