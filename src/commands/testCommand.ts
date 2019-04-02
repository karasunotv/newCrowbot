import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class testCommand implements IBotCommand{
   
   private readonly _command = "testCommand"
   
    help(): string {
        
        return "This command does nothing :)";
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
   
    runCommand(args: string[], msgObject: Discord.Message, bot: Discord.Client): void {
       
        //Let us know it worked
        msgObject.channel.send("It works!");
    }


}