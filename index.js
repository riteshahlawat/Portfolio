require('dotenv').config();

const express = require("express");
const expressIp = require("express-ip");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");
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

app.get('/storeIp', (req, res) => {
  const ipInfo = req.ipInfo;
  res.send(ipInfo);
})

const PORT = 443;

app.listen(process.env.PORT || PORT, err => {
  if (err) console.log;
  console.log(`Server started on port: ${PORT}`);
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}`);
});

bot.on("message", msg => {
  if (msg.content == 'ping') {
    msg.reply("pong");
    msg.channel.send("pong");
  }
})
