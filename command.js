require("dotenv").config()
const { REST, Routes } = require("discord.js");
const token = process.env.BOT_TOKEN;
const botId = process.env.BOT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
    {
        name: "hey",
        description: "Says Hey"
    },

    {
        name: "refresh",
        description: "sets all threads as active"
    },
    {
        name: "on",
        description: "auto refresh on"
    },
    {
        name: "off",
        description: "auto refresh off"
    },
    {
      name: "status",
      description: "check auto refresh status"
    },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {

    try {
  
      console.log("Registering slash commands...");
  
      await rest.put(
  
        Routes.applicationGuildCommands(botId, guildId),
  
        { body: commands }
  
      );
  
      console.log("Slash commands registered.");
  
    } catch (error) {
  
      console.log(`Error: ${error}`);
  
    }
  
  })();
  