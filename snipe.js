require("dotenv").config();

const Discord = require("discord.js");
const fs = require('fs');
const { EventEmitter } = require("stream");
const client = new Discord.Client();
fetch = require('node-fetch');
moment = require("moment-timezone");

const prefix = ".";

client.on('ready', () => {
client.user.setPresence({
  status: 'online',
  activity: {
   type: 'PLAYING',
   name: 'URL Sniper by zk#1337',
  },
 });
});


client.once("ready", () => {
  console.log('\x1b[31m%s\x1b[0m',"Prêt pour snipe des url !");
  console.log('\x1b[31m%s\x1b[0m',"Dev by zk#1337");
  console.log('\x1b[32m%s\x1b[0m',`Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

});

    class Main {
      constructor() {
          this.sniperInterval;
      }
  
      async setVanityURL(url, guild) {
          const time = moment.tz(Date.now(), "Europe/Paris").format("HH:mm:ss");
          console.log(`[${time}] [INFO] Sniping discord.gg/${url}`);
          return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
              "credentials": "include",
              "headers": {
                  "accept": "*/*",
                  "authorization": "Bot " + client.token,
                  "content-type": "application/json",
              },
              "referrerPolicy": "no-referrer-when-downgrade",
              "body": JSON.stringify({
                  "code": url
              }),
              "method": "PATCH",
              "mode": "cors"
          });
      }
      async checkVanityURL(url) {
          return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
              "credentials": "include",
              "headers": {
                  "accept": "*/*",
                  "authorization": "Bot " + client.token,
                  "content-type": "application/json",
              },
              "referrerPolicy": "no-referrer-when-downgrade",
              "method": "GET",
              "mode": "cors"
          });
      }
  
      async startSnipe(url, guild) {
          this.sniperInterval = setInterval(async () => {
              await this.setVanityURL(url, guild);
          }, 1000);
      }
  
      stopSnipe() {
          return clearInterval(this.sniperInterval);
      }
  }
  
  let handler = new Main();
  
  client.on('message', async (message) => {
      let messageArray = message.content.split(" "),
          args = messageArray.slice(1);
      const args1 = message.content.slice(prefix.length).split(/ +/),
            command = args1.shift().toLowerCase();
  
      if (command === "start-snipe") {
          let url = args[0];
          
  
          if (!message.guild.features.includes('VANITY_URL')) {
              return message.reply("Vous ne possédez pas l'options VANITY_URL");
          };
  
          message.reply(`Je commence à vérifier l'URL ${url} dès maintenant!`);
          console.log(`[INFO] Start sniping the url ${url} !`);
          await handler.startSnipe(url, message.guild);
      };
  
      if (command === "stop-snipe") {
          handler.stopSnipe();
      };
      
  
  });

client.login("TOKEN")
