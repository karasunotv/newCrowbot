import * as Discord from "discord.js";

import * as ConfigFile from "./config";

const bot: Discord.Client = new Discord.Client();

bot.on("ready", () => {

    //Let us know the bot is online
    console.log("Ready to go")
})

bot.on("message", msg => {

    //Ignore the meesage if it was sent by the bot
    if(msg.author.bot) {return; }

    //Ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {return;}

    msg.channel.send(`${msg.author.username} just used a command!`);

})

bot.login(ConfigFile.config.token);