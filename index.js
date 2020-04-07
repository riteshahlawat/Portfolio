require("dotenv").config();

const express = require("express");
const expressIp = require("express-ip");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");


// DISCORD
const Discord = require("discord.js");

const bot = new Discord.Client();
var logsChannel;

const DTOKEN = process.env.TOKEN;

bot.login(DTOKEN);
const app = express();

app.use(sslRedirect());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressIp().getIpInfoMiddleware);

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"],
  })
);
// Get my repos

// Store ip and upload to discord channel
app.get("/storeIp", (req, res) => {
  const ipInfo = req.ipInfo;
  console.log(ipInfo.ip);
  let tempIp = ipInfo.ip;
  let yourIp = process.env.IP;

  let city = ipInfo.city;
  let state = ipInfo.region;
  let country = ipInfo.country;
  let lat = ipInfo.ll[0];
  let long = ipInfo.ll[1];

  let messageEmbed;
  let file;
  // Only parse if not your ip
  if (tempIp != yourIp) {
    // Get varaiables

    messageEmbed = new Discord.MessageEmbed()
      .setColor("#fc0390")
      .setTitle("Someone Went On Your Website!")
      .setAuthor(
        "Ritesh Ahlawat",
        "https://ritesh.social/files/portfolio/me.jpg",
        "https://ritesh.social"
      )
      .setDescription("Damb bruh check this dumbass out yo")
      .setThumbnail(
        "https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/letter-r-icon-256.png"
      )
      .addFields(
        { name: "\u200B", value: "\u200B" },
        { name: "IP", value: `${tempIp}` },
        { name: "City", value: `${city}`, inline: true },
        { name: "State", value: `${state}`, inline: true },
        { name: "Country", value: `${country}`, inline: true },
        { name: "Latitude", value: `${lat}`, inline: true },
        { name: "Longitude", value: `${long}`, inline: true },
        { name: "\u200B", value: "\u200B" }
      )
      .setImage(
        `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCxVxnNUAEL2BFgScCl5CwPD1yDulNe5Hg&center=${lat},${long}&markers=color:red%7C${lat},${long}&zoom=11&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=500x400`
      )
      .setTimestamp()
      .setFooter("He do be getting yeeted doe");

    // General channel
    logsChannel.send(messageEmbed);
    res.send(ipInfo);
  } else {
    file = "https://i.ytimg.com/vi/AgmnUl31_ng/maxresdefault.jpg";
    // General channel
    messageEmbeded = new Discord.MessageEmbed()
      .setColor("#fc0390")
      .setTitle("You visited your own website")
      .setAuthor(
        "Ritesh Ahlawat",
        "https://ritesh.social/files/portfolio/me.jpg",
        "https://ritesh.social"
      )
      .setDescription("damb.")
      .setThumbnail(
        "https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/letter-r-icon-256.png"
      )
      .setTimestamp()
      .setFooter("I don't be getting yeeted doe");

    // General channel
    logsChannel.send(messageEmbeded);
    res.send(ipInfo);
  }
});

const PORT = 443;

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log;
  console.log(`Server started on port: ${PORT}`);
});

bot.on("ready", () => {
  bot.channels.fetch("694702074130202697").then((channel) => {
    logsChannel = channel;
  });

  console.log(`Logged in as ${bot.user.username}`);
});
// When a message is sent
bot.on("message", (msg) => {});
