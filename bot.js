require("dotenv").config();

const { Client, IntentsBitField, ThreadChannel } = require('discord.js');
const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    ],
});

const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
var active = true;

const initClient = async () => {
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

  await client.login(token);
  return true;
};



// Method to fetch all channels in a guild
const fetchAllChannels = async () => {
    console.log("running faC...")
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        console.error(`Guild with ID ${guildId} not found`);
        return;
    }

    const channels = guild.channels.cache;
    channels.forEach(async (channel) => {
        // Check if the channel is a thread
        if (channel.isThread()) {
            // Autojoin the thread
            try {
                await channel.join();
            } catch (error) {
            }

            channel.setArchived(false)
            if(channel.archived = true) {
                console.log(channel.name)
                channel.send({
                    content: "refresh",
                    flags: [ 4096 ]
                  })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10)
                })
            }
        }
    });
    console.log("faC finished...")
};

async function main() {
    const status = await initClient();
    console.log(status);
    await new Promise(resolve => setTimeout(resolve, 500));
    var runCount = 0;
    while(true) {
        runCount = runCount + 1;
        console.log(runCount);
        if(active) {
            await new Promise(resolve => setTimeout(resolve, 86000000));
            await fetchAllChannels();
        }
        await new Promise(resolve => setTimeout(resolve, 400000));
        console.log("reloading...")
    }
}
main();




client.on("interactionCreate", (i) => {
    if(!i.isChatInputCommand()) return;

    if(i.commandName == "hey")
        i.reply("hey");

     if(i.commandName == "refresh") {
        fetchAllChannels()
     }
    
     if(i.commandName == "on") {
        active = true
     }

     if(i.commandName == "off") {
        active = false
     }

        
})