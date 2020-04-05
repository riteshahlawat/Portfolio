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

app.get("/storeIp", (req, res) => {
  const ipInfo = req.ipInfo;
  console.log(ipInfo.ip);
  let tempIp = ipInfo.ip;
  let yourIp = process.env.IP;
  let parsedData;

  let address = "";
  let city = ipInfo.city;
  let state = ipInfo.region;
  let country = ipInfo.country;
  let lat = ipInfo.ll[0];
  let long = ipInfo.ll[1];

  let message;

  let file;
  // Only parse if not your ip
  if (tempIp != yourIp) {
    // Get varaiables

    const messageEmbed = new Discord.MessageEmbed()
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
        { name: "IP", value: `${tempIp}`, inline: true },
        { name: "City", value: `${city}`, inline: true },
        { name: "State", value: `${state}`, inline: true },
        { name: "Country", value: `${country}`, inline: true },
        { name: "Latitude", value: `${lat}`, inline: true },
        { name: "Longitude", value: `${long}`, inline: true },
        { name: "\u200B", value: "\u200B" }
      )
      .setTimestamp()
      .setFooter("He do be getting yeeted doe");

    // General channel
    logsChannel.send(messageEmbed);
    res.send(ipInfo);
  } else {
    message = `\nDamn bruh you just visited your own website dawg.\npwes enjoy this stupid fucking baby\n`;
    file = "https://i.ytimg.com/vi/AgmnUl31_ng/maxresdefault.jpg";
    // General channel
    const messageEmbed = new Discord.MessageEmbed()
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
        { name: "IP", value: `${tempIp}`, inline: true },
        { name: "City", value: `${city}`, inline: true },
        { name: "State", value: `${state}`, inline: true },
        { name: "Country", value: `${country}`, inline: true },
        { name: "Latitude", value: `${lat}`, inline: true },
        { name: "Longitude", value: `${long}`, inline: true },
        { name: "\u200B", value: "\u200B" }
      )
      .setTimestamp()
      .setFooter("He do be getting yeeted doe");

    // General channel
    logsChannel.send(messageEmbed);
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
