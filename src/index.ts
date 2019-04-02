import * as Discord from "discord.js";

import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const bot: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

bot.on("ready", () => {

    //Let us know the bot is online
    console.log("Ready to go")
})

bot.on("message", msg => {

    //Ignore the meesage if it was sent by the bot
    if(msg.author.bot) {return; }

    //Ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {return;}

    
    //handle the command
    handleCommand(msg);

})

async function handleCommand(msg: Discord.Message){

    //Split the string into the command and al of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = msg.content.split(" ").slice(1);

    //Loop throught all of the loaded commands
    for(const commandClass of commands){

        //attempt to execute code but ready for an error
        try{

            //Check if our command class is the right one
            if(!commandClass.isThisCommand(command)){

                //Go to the next iteration of the loop if this is not the correct command
                continue;
            }

            //Pause the execution whilst we run the commad's code
            await commandClass.runCommand(args, msg, bot);
        }
        catch(exception){

            //If there is an error, then log the exception
            console.log(exception);
        }
    }

}

function loadCommands(commandsPath: string){

    //exit if there is no command
    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0)
    {return;}

    //Loop through all the commands in the config file
    for(const commandName of ConfigFile.config.commands as string[]){

        const commandClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandClass() as IBotCommand;

        commands.push(command);
    }
}

bot.login(ConfigFile.config.token);