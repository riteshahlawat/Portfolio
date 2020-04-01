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
  let tempIp = ipInfo.ip;
  let yourIp = process.env.IP;
  let parsedData;

  let organization = "";
  let address = "";
  let city = ipInfo.city;
  let state = ipInfo.region;
  let country = ipInfo.country;

  let message;

  // WhoIs lookup for org and org address
  whois.lookup(tempIp, (err, data) => {
    if (err) console.log(err);
    let file;
    parsedData = whoisParser.parseWhoIsData(data);
    // Only parse if not your ip
    if (tempIp != yourIp) {
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
        }
      }
      message = `Someone went on your website!! \n \n IP: ${tempIp} \n Organization: ${organization} \n Address: ${address} \n City: ${city} \n State: ${state} \n Country: ${country}`;
      file = "https://i.ytimg.com/vi/AgmnUl31_ng/maxresdefault.jpg";
    }
    else {
      message = `Damn bruh you just visited your own website dawg.\npwes enjoy this stupid fucking baby`
      file = "https://i.ytimg.com/vi/AgmnUl31_ng/maxresdefault.jpg";
    }
    // Make message to send to channel
  
    // General channel
    bot.channels
      .fetch("694702074130202697")
      .then(channel => {
        channel.send(message, {
          // Options
          files: [file]
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
